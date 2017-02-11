
<todo>

  <style>
  :scope {
    display: block;

    max-width: 400px;
    margin: 5% auto;
  }
  </style>

  <h3>Title: { opts.title }</h3>

  <ul>
    <li each={ items.filter(whatShow) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input ref="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.filter(whatShow).length + 1 }</button>

    <button type="button" disabled={ items.filter(onlyDone).length == 0 } onclick={ removeAllDone }>
    X{ items.filter(onlyDone).length } </button>
  </form>

  <!-- this script tag is optional -->
  <script>
    this.items = opts.items

    this.edit = (e) => {
      this.text = e.target.value
    }

    this.add = (e) => {
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.refs.input.value = ''
      }
      e.preventDefault()
    }

    this.removeAllDone = (e) => {
      this.items = this.items.filter(function(item) {
        return !item.done
      })
    }

    // an two example how to filter items on the list
    this.whatShow = (item) => {
      return !item.hidden
    }

    this.onlyDone = (item) => {
      return item.done
    }

    this.toggle = (e) => {
      var item = e.item
      item.done = !item.done
      return true
    }
  </script>

</todo>