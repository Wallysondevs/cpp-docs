# operator+,-(ranges::elements_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (1) (desde C++20)
friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i )
requires ranges::random_access_range<Base>;  // (2) (desde C++20)
friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (3) (desde C++20)
friend constexpr difference_type operator-( const /*iterator*/& x,
const /*iterator*/& y )
requires std::sized_sentinel_for<ranges::iterator_t<Base>, ranges::iterator_t<Base>>;  // (4) (desde C++20)
```

  
1,2) Retorna o iterator i incrementado por n.

3) Retorna o iterator i decrementado por n.

4) Retorna a distância entre x e y.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `elements_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i, x, y  |  \-  |  os iterators   
---|---|---
n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,2) [&]{ auto j = i; j += n; return j; }()

3) [&]{ auto j = i; j -= n; return j; }()

4) x.base() - y.base()

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 3483](<https://cplusplus.github.io/LWG/issue3483>) | C++20  | A diferença de `elements_view::iterator` é super-restrita  | o requisito é relaxado 