# std::basic_stacktrace&lt;Allocator&gt;::~basic_stacktrace

```cpp
~basic_stacktrace();  // (desde C++23)
```

  
Destrói o `basic_stacktrace`. Os destrutores dos objetos `std::stacktrace_entry` que ele contém são chamados e o armazenamento utilizado é desalocado. 

### Complexidade

Linear no tamanho do `basic_stacktrace`. 