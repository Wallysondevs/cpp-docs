# std::swap(std::promise)

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class R >
void swap( promise<R>& lhs, promise<R>& rhs ) noexcept;
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::promise](<#/doc/thread/promise>). Troca o estado compartilhado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — promises cujos estados serão trocados

### Valor de retorno

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/thread/promise/swap>) | troca dois objetos promise
(função membro pública)