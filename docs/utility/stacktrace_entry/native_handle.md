# std::stacktrace_entry::native_handle

```cpp
constexpr native_handle_type native_handle() const noexcept;  // (desde C++23)
```

  
Retorna o handle nativo subjacente definido pela implementação. Invocações sucessivas desta função para um objeto `stacktrace_entry` inalterado retornam valores idênticos.

A semântica desta função é definida pela implementação.

### Parâmetros

(nenhum)

### Valor de retorno

Handle nativo subjacente.

### Exemplo

| Esta seção está incompleta  
Motivo: nenhum exemplo   