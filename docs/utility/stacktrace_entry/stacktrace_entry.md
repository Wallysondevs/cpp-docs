# std::stacktrace_entry::stacktrace_entry

```cpp
constexpr stacktrace_entry() noexcept;  // (1) (desde C++23)
constexpr stacktrace_entry( const stacktrace_entry& other ) noexcept;  // (2) (desde C++23)
```

1) Construtor padrão. Cria um `stacktrace_entry` vazio.

2) Construtor de cópia. Cria uma cópia de `other`.

### Parameters

- **other** — outro `stacktrace_entry` para copiar

### Notes

Um `stacktrace_entry` não vazio pode ser obtido de um `std::basic_stacktrace` criado por `std::basic_stacktrace::current` ou de uma cópia de tal `std::basic_stacktrace`.

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### See also

[ (constructor)](<#/doc/utility/source_location/source_location>) | constrói um novo `source_location` com valores definidos pela implementação
(função membro pública de `std::source_location`)