﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIplom_ZKL.Server.Models;
using DIplom_ZKL.Server.Models.DTO;

namespace DIplom_ZKL.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskitemsController : ControllerBase
    {
        private readonly DiplomContext _context;

        public TaskitemsController()
        {
            _context = new DiplomContext();
        }

        // GET: api/Taskitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Taskitem>>> GetTaskitems()
        {
            return await _context.Taskitems.ToListAsync();
        }

        // GET: api/Taskitems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Taskitem>> GetTaskitem(Guid id)
        {
            var taskitem = await _context.Taskitems.FindAsync(id);

            if (taskitem == null)
            {
                return NotFound();
            }

            return taskitem;
        }

        // PUT: api/Taskitems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskitem(Guid id, Taskitem taskitem)
        {
            if (id != taskitem.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskitem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskitemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Taskitems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Taskitem>> PostTaskitem(TaskitemDto taskitemDto)
        {
            User author = await _context.Users.FirstOrDefaultAsync(u => u.Id == taskitemDto.AuthorId);
            Statement statement = await _context.Statements.FirstOrDefaultAsync(s => s.Id == (
                (taskitemDto.StatementId != null && taskitemDto.StatementId > 1) ? taskitemDto.StatementId : 1  //TODO: Нормальную проверку бы
            ));
            Taskitem taskitem = new Taskitem();
            //не забываем заполнить недостающее. Не с фронта ж это забирать
            taskitem.Id = Guid.NewGuid();
            taskitem.Title = taskitemDto.Title;
            taskitem.Description = taskitemDto.Description;
            taskitem.Start = taskitemDto.Start;
            taskitem.End = taskitemDto.End;
            taskitem.CreatedAt = DateTime.Now;
            taskitem.Author = author.Id;
            taskitem.Statement = statement.Id;
            taskitem.AuthorNavigation = author;
            taskitem.StatementNavigation = statement;
            _context.Taskitems.Add(taskitem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskitem", new { id = taskitem.Id }, taskitem);
        }

        // DELETE: api/Taskitems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskitem(Guid id)
        {
            var taskitem = await _context.Taskitems.FindAsync(id);
            if (taskitem == null)
            {
                return NotFound();
            }

            _context.Taskitems.Remove(taskitem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskitemExists(Guid id)
        {
            return _context.Taskitems.Any(e => e.Id == id);
        }
    }
}
