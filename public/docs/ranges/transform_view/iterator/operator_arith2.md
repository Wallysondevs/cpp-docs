# operator+,-(ranges::transform_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( /*iterator*/ i, difference_type n )
requires ranges::random_access_range<Base>;  // (1) (desde C++20)
friend constexpr /*iterator*/ operator+( difference_type n, /*iterator*/ i )
requires ranges::random_access_range<Base>;  // (2) (desde C++20)
friend constexpr /*iterator*/ operator-( /*iterator*/ i, difference_type n )
requires ranges::random_access_range<Base>;  // (3) (desde C++20)
friend constexpr difference_type operator-( const /*iterator*/& x,
const /*iterator*/& y )
requires std::sized_sentinel_for<ranges::iterator_t<Base>,
ranges::iterator_t<Base>>;  // (4) (desde C++20)
```

  
1,2) Retorna o iterador i incrementado por n.

3) Retorna o iterador i decrementado por n.

4) Retorna a distância entre x e y.

Estas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `transform_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i, x, y  |  \-  |  os iteradores.   
---|---|---
n  |  \-  |  posição relativa à localização atual.   
  
### Valor de retorno

Seja `parent_` o ponteiro para o `transform_view` pai, `current_` o iterador subjacente. 

1,2) /*iterator*/{*i.parent_, i.current_ + n}

3) /*iterator*/{*i.parent_, i.current_ - n}

4) x.current_ - y.current_

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 3483](<https://cplusplus.github.io/LWG/issue3483>) | C++20  | A diferença de `transform_view::iterator` é excessivamente restrita  | o requisito é flexibilizado 