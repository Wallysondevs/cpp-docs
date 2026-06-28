# operator+,-(ranges::enumerate_view::iterator)

```cpp
friend constexpr /* iterator */  
operator+( const /* iterator */& i, difference_type n )  
requires ranges::random_access_range</* Base */>; |  (1)  |  (desde C++23)  
---|---|---  
friend constexpr /* iterator */  
operator+( difference_type n, const /* iterator */& i )  
requires ranges::random_access_range</* Base */>; |  (2)  |  (desde C++23)  
friend constexpr /* iterator */  
operator-( const /* iterator */& i, difference_type n )  
requires ranges::random_access_range</* Base */>; |  (3)  |  (desde C++23)  
friend constexpr difference_type  
operator-( const /* iterator */& i, const /* iterator */& j ) noexcept; |  (4)  |  (desde C++23)  
| |   
```
Realiza aritmética de [iterator](<#/doc/ranges/enumerate_view/iterator>) ou calcula a distância.

[`_pos__`](<#/doc/ranges/enumerate_view/iterator>) é o índice subjacente, e [`_Base_`](<#/doc/ranges/enumerate_view/iterator>) é o tipo (possivelmente qualificado com const) da view subjacente.

Equivalente a:

```cpp
1) auto temp = i; temp += n; return temp;

2) return i + n;

3) auto temp = i; temp -= n; return temp;

4) return i.pos_ - j.pos_;
```
Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `enumerate_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i, j  |  \-  |  os iterators   
---|---|---
n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,2) Um iterator incrementado.

3) Um iterator decrementado.

4) Uma distância entre os iterators fornecidos.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3912](<https://cplusplus.github.io/LWG/issue3912>) | C++23  | a sobrecarga (4) não era noexcept | é noexcept  
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/enumerate_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  