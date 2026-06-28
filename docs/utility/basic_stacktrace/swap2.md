# std::swap(std::basic_stacktrace)

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template< class Allocator >
void swap( std::basic_stacktrace<Allocator>& lhs, std::basic_stacktrace<Allocator>& rhs )
noexcept(noexcept(lhs.swap(rhs)));
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para std::basic_stacktrace. Troca o conteúdo de lhs e rhs. Equivalente a lhs.swap(rhs);.

### Parâmetros

- **lhs, rhs** — stacktraces cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/utility/basic_stacktrace/swap>) | troca o conteúdo
(função membro pública)