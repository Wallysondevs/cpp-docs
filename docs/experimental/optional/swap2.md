# std::experimental::swap(std::experimental::optional)

Definido no cabeçalho `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```c
template< class T >
void swap( optional<T>& lhs, optional<T>& rhs ) noexcept(/* see below */);
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::experimental::optional](<#/doc/experimental/optional>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — objetos `optional` cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(noexcept(lhs.swap(rhs)))

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/experimental/optional/swap>) | troca os conteúdos
(função membro pública)