/**
 * BSD 3-Clause License
 *
 * Copyright © 2023, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module Plugin
 */

export abstract class Plugin<T> {
  /**
   * Retrieves the name.
   *
   * @returns {string} The name.
   */
  abstract get name(): string

  /**
   * Executes the function with the given arguments.
   *
   * @param {...T} args - The arguments to be passed to the function.
   * @return {void}
   */
  abstract execute(...args: T[]): void
}

export class PluginManager<T> {
  protected plugins: Plugin<T>[]

  constructor() {
    this.plugins = []
  }

  /**
   * Registers a plugin.
   *
   * @param {Plugin<T>} plugin - The plugin to register.
   * @return {boolean} - Returns true if the plugin is registered successfully, otherwise returns false.
   */
  register(plugin: Plugin<T>): boolean {
    const i = this.indexOf(plugin)

    if (-1 === i) {
      this.plugins.push(plugin)
      return true
    }

    return false
  }

  /**
   * Deregisters a plugin from the system.
   *
   * @param {Plugin<T> | string} plugin - The plugin or the name of the plugin to be deregistered.
   * @return {boolean} - Returns true if the plugin was successfully deregistered, otherwise false.
   */
  deregister(plugin: Plugin<T> | string): boolean {
    const i = this.indexOf(plugin)

    if (-1 < i) {
      this.plugins.splice(i, 1)
      return true
    }

    return false
  }

  /**
   * Executes the `execute` method of all plugins.
   *
   * @param {...T} args - The arguments to pass to the `execute` method.
   * @return {void}
   */
  execute(...args: T[]): void {
    for (const p of this.plugins) {
      p.execute(...args)
    }
  }

  /**
   * Finds the index of the specified plugin in the plugins array.
   *
   * @param {Plugin<T> | string} plugin - The plugin to search for. Can be either a Plugin object or a string representing the plugin name.
   * @return {number} - The index of the plugin in the plugins array. Returns -1 if the plugin is not found.
   */
  protected indexOf(plugin: Plugin<T> | string): number {
    const plugins = this.plugins
    const name = 'string' === typeof plugin ? plugin : plugin.name

    for (let i = plugins.length - 1; i >= 0; --i) {
      if (name === plugins[i].name) {
        return i
      }
    }

    return -1
  }
}