# std::experimental::ranges::ForwardIterator

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool ForwardIterator =
InputIterator<I> &&
DerivedFrom<ranges::iterator_category_t<I>, ranges::forward_iterator_tag> &&
Incrementable<I> &&
Sentinel<I, I>;
```

O concept `ForwardIterator<I>` refina [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>) adicionando comparação de igualdade e a garantia de múltiplas passagens.

O domínio de `==` para iteradores forward é o de iteradores sobre a mesma sequência subjacente, exceto que iteradores do mesmo tipo inicializados por valor podem ser comparados entre si e devem comparar como iguais.

Ponteiros e referências obtidos de um iterador forward em um range `[`i`, `s`)` devem permanecer válidos enquanto `[`i`, `s`)` continuar a denotar um range.

Sejam `a` e `b` dois iteradores dereferenciáveis do tipo `I`. `ForwardIterator<I>` é satisfeito apenas se:

  * a == b implica ++a == ++b; e
  * A expressão ([](X x){ ++x; }(a), *a) é equivalente a *a, ou seja, incrementar uma cópia de `a` não tem efeito no resultado da desreferenciação de `a`.

Isso é conhecido como a _garantia de múltiplas passagens_.

### Notas

Um iterador forward não pode ser "stashing": ele não pode retornar uma referência a um objeto dentro de si mesmo, porque tais referências seriam invalidadas pela destruição do iterador forward.