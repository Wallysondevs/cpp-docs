# std::pair&lt;T1,T2&gt;::operator=

```cpp
  // (1)
pair& operator=( const pair& other ); |  | (ate C++20)
constexpr pair& operator=( const pair& other );  // (desde C++20)
constexpr const pair& operator=( const pair& other ) const;  // (2) (desde C++23)
  // (3)
template< class U1, class U2 >
pair& operator=( const pair<U1, U2>& other ); |  | (ate C++20)
template< class U1, class U2 >
constexpr pair& operator=( const pair<U1, U2>& other );  // (desde C++20)
template< class U1, class U2 >
constexpr const pair& operator=( const pair<U1, U2>& other ) const;  // (4) (desde C++23)
  // (5)
pair& operator=( pair&& other ) noexcept(/* see below */);  // (desde C++11)
(ate C++20)
constexpr pair& operator=( pair&& other ) noexcept(/* see below */);  // (desde C++20)
constexpr const pair& operator=( pair&& other ) const;  // (6) (desde C++23)
  // (7)
template< class U1, class U2 >
pair& operator=( pair<U1, U2>&& p );  // (desde C++11)
(ate C++20)
template< class U1, class U2 >
constexpr pair& operator=( pair<U1, U2>&& p );  // (desde C++20)
template< class U1, class U2 >
constexpr const pair& operator=( pair<U1, U2>&& p ) const;  // (8) (desde C++23)
template< pair-like P >
constexpr pair& operator=( P&& u );  // (9) (desde C++23)
template< pair-like P >
constexpr const pair& operator=( P&& u ) const;  // (10) (desde C++23)
```

  
Substitui o conteúdo do par. 

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other. O operador de atribuição é implicitamente declarado. Usar este operador de atribuição torna o programa malformado se T1 ou T2 for um tipo qualificado como const, ou um tipo de referência, ou um tipo de classe com um operador de atribuição por cópia inacessível, ou um tipo array de tal classe. | (ate C++11)  
---|---
Esta sobrecarga é definida como deletada se [std::is_copy_assignable](<#/doc/types/is_copy_assignable>)&lt;T1&gt;::value ou [std::is_copy_assignable](<#/doc/types/is_copy_assignable>)&lt;T2&gt;::value for falso. | (desde C++11)  
  
2) Operador de atribuição por cópia para operando qualificado como const.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;const T1&gt; e [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;const T2&gt; forem ambos verdadeiros.

3) Atribui other.first a `first` e other.second a `second`. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_assignable](<#/doc/types/is_assignable>)<T1&, const U1&>::value e [std::is_assignable](<#/doc/types/is_assignable>)<T2&, const U2&>::value forem ambos verdadeiros. | (desde C++11)  
  
4) Atribui other.first a `first` e other.second a `second`.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T1&, const U1&&gt; e [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T2&, const U2&&gt; forem ambos verdadeiros.

5) Operador de atribuição por movimento. Substitui o conteúdo pelo de other usando move semantics.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_move_assignable](<#/doc/types/is_move_assignable>)&lt;T1&gt;::value e [std::is_move_assignable](<#/doc/types/is_move_assignable>)&lt;T2&gt;::value forem ambos verdadeiros.

6) Operador de atribuição por movimento para operando qualificado como const.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T1&, T1&gt; e [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T2&, T2&gt; forem ambos verdadeiros.

7) Atribui [std::forward](<#/doc/utility/forward>)&lt;U1&gt;(p.first) a `first` e [std::forward](<#/doc/utility/forward>)&lt;U2&gt;(p.second) a `second`.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_assignable](<#/doc/types/is_assignable>)<T1&, U1>::value e [std::is_assignable](<#/doc/types/is_assignable>)<T2&, U2>::value forem ambos verdadeiros.

8) Atribui [std::forward](<#/doc/utility/forward>)&lt;U1&gt;(p.first) a `first` e [std::forward](<#/doc/utility/forward>)&lt;U2&gt;(p.second) a `second`.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T1&, U1&gt; e [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T2&, U2&gt; forem ambos verdadeiros.

9) Atribui std::get<0>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(u)) a `first` e std::get<1>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(u)) a `second`.

Esta sobrecarga participa da resolução de sobrecarga apenas se 

  * [std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;P&gt;, [std::pair](<#/doc/utility/pair>)> for falso, 
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;P&gt; não for uma especialização de [std::ranges::subrange](<#/doc/ranges/subrange>), 
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<T1&, decltype(std::get<0>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(p)))> for verdadeiro, e 
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<T1&, decltype(std::get<1>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(p)))> for verdadeiro.

10) Atribui std::get<0>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(u)) a `first` e std::get<1>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(u)) a `second`.

Esta sobrecarga participa da resolução de sobrecarga apenas se 

  * [std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;P&gt;, [std::pair](<#/doc/utility/pair>)> for falso, 
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;P&gt; não for uma especialização de [std::ranges::subrange](<#/doc/ranges/subrange>), 
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<const T1&, decltype(std::get<0>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(p)))> for verdadeiro, e 
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<const T1&, decltype(std::get<1>([std::forward](<#/doc/utility/forward>)&lt;P&gt;(p)))> for verdadeiro.

### Parâmetros

other  |  \-  |  par de valores para substituir o conteúdo deste par   
---|---|---
p  |  \-  |  par de valores de tipos possivelmente diferentes para substituir o conteúdo deste par   
u  |  \-  |  objeto [_pair-like_](<#/doc/utility/tuple/tuple-like>) de valores para substituir o conteúdo deste par   
Requisitos de tipo   
-`T1` deve satisfazer os requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) de `U1`. (ate C++11)  
-`T2` deve satisfazer os requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) de `U2`. (ate C++11)  
  
### Valor de retorno

*this

### Exceções

1-4) Pode lançar exceções definidas pela implementação.

5)

Especificação `noexcept`: 

noexcept(  

[std::is_nothrow_move_assignable](<#/>)&lt;T1&gt;::value &&  
[std::is_nothrow_move_assignable](<#/>)&lt;T2&gt;::value  

)

6-10) Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <utility>
    #include <vector>
    
    template<class Os, class T>
    Os& operator<<(Os& os, const std::vector<T>& v)
    {
        os << '{';
        for (std::size_t t = 0; t != v.size(); ++t)
            os << v[t] << (t + 1 < v.size() ? ", " : "");
        return os << '}';
    }
    
    template<class Os, class U1, class U2>
    Os& operator<<(Os& os, const std::pair<U1, U2>& pair)
    {
        return os << '{' << pair.first << ", " << pair.second << '}';
    }
    
    int main()
    {
        std::pair<int, std::vector<int>> p{1, {2}}, q{2, {5, 6}};
    
        p = q; // (1) operator=(const pair& other);
        std::cout << std::setw(23) << std::left
                  << "(1) p = q;"
                  << "p: " << p << "     q: " << q << '\n';
    
        std::pair<short, std::vector<int>> r{4, {7, 8, 9}};
        p = r; // (3) operator=(const pair<U1, U2>& other);
        std::cout << std::setw(23)
                  << "(3) p = r;"
                  << "p: " << p << "  r: " << r << '\n';
    
        p = std::pair<int, std::vector<int>>{3, {4}};
        p = std::move(q); // (5) operator=(pair&& other);
        std::cout << std::setw(23)
                  << "(5) p = std::move(q);"
                  << "p: " << p << "     q: " << q << '\n';
    
        p = std::pair<int, std::vector<int>>{5, {6}};
        p = std::move(r); // (7) operator=(pair<U1, U2>&& other);
        std::cout << std::setw(23)
                  << "(7) p = std::move(r);"
                  << "p: " << p << "  r: " << r << '\n';
    }
```

Output: 
```
    (1) p = q;             p: {2, {5, 6}}     q: {2, {5, 6}}
    (3) p = r;             p: {4, {7, 8, 9}}  r: {4, {7, 8, 9}}
    (5) p = std::move(q);  p: {2, {5, 6}}     q: {2, {}}
    (7) p = std::move(r);  p: {4, {7, 8, 9}}  r: {4, {}}
    
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 885](<https://cplusplus.github.io/LWG/issue885>) | C++98  | atribuição por cópia heterogênea ausente  | adicionado (como sobrecarga (3))   
[LWG 2729](<https://cplusplus.github.io/LWG/issue2729>) | C++11  | `pair::operator=` não era restrito e poderia resultar em comportamento indefinido desnecessário  | restrito   
  
### Veja também

[ operator=](<#/>) |  atribui o conteúdo de uma `tuple` a outra   
(função membro pública de `std::tuple<Types...>` )  