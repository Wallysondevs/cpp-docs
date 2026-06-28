# operator+(std::move_iterator)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
move_iterator<Iter> operator+
( typename move_iterator<Iter>::difference_type n,
const move_iterator<Iter>& it );
(constexpr desde C++17)
(até C++20)
template< class Iter >
constexpr move_iterator<Iter> operator+
( std::iter_difference_t<Iter> n, const move_iterator<Iter>& it );
```

Retorna o iterator `it` incrementado por `n`.

Esta sobrecarga participa da resolução de sobrecarga somente se `it.base() + n` for bem-formado e tiver o tipo `Iter`. | (desde C++20)

### Parâmetros

- **n** — o número de posições para incrementar o iterator
- **it** — o adaptador de iterator a ser incrementado

### Valor de retorno

`it + n`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3293](<https://cplusplus.github.io/LWG/issue3293>) | C++20 | o operator+ não-membro era restrito a
exigir que `it + n` fosse bem-formado e tivesse o tipo `Iter` | alterado para
`it.base() + n`

### Ver também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/move_iterator/operator_arith>)(C++11) | avança ou decrementa o iterator
(função membro pública)
[ operator-](<#/doc/iterator/move_iterator/operator->)(C++11) | calcula a distância entre dois adaptadores de iterator
(modelo de função)