# std::stacktrace_entry::operator bool

```cpp
constexpr explicit operator bool() const noexcept;  // (desde C++23)
```

  
Verifica se a `stacktrace_entry` não está vazia, ou seja, se representa uma avaliação em um stacktrace. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se a `stacktrace_entry` não estiver vazia, false caso contrário. 

### Observações

Uma `stacktrace_entry` não vazia pode ser obtida de um std::basic_stacktrace criado por std::basic_stacktrace::current ou de uma cópia de tal `std::basic_stacktrace`. 

Uma `stacktrace_entry` vazia pode ser criada pelo [construtor padrão](<#/doc/utility/stacktrace_entry/stacktrace_entry>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   