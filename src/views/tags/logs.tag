<logs>

  <h4>Logs below</h4>

  <button onclick={opts.onclear}>
    Clear logs
  </button>

  <ul>
    <li each={ opts.logs }>{ text }</li>
  </ul>

</logs>
