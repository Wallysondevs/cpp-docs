# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::unique_ptr)

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T1, class D1, class T2, class D2 >
bool operator==( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
(constexpr desde C++23)
template< class T1, class D1, class T2, class D2 >
bool operator!=( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
(até C++20)
template< class T1, class D1, class T2, class D2 >
bool operator<( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
template< class T1, class D1, class T2, class D2 >
bool operator<=( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
template< class T1, class D1, class T2, class D2 >
bool operator>( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
template< class T1, class D1, class T2, class D2 >
bool operator>=( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
template< class T1, class D1, class T2, class D2 >
requires std::three_way_comparable_with<
typename unique_ptr<T1, D1>::pointer,
typename unique_ptr<T2, D2>::pointer>
std::compare_three_way_result_t<typename unique_ptr<T1, D1>::pointer,
typename unique_ptr<T2, D2>::pointer>
operator<=>( const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y );
template< class T, class D >
bool operator==( const unique_ptr<T, D>& x, std::nullptr_t ) noexcept;
(constexpr desde C++23)
template< class T, class D >
bool operator==( std::nullptr_t, const unique_ptr<T, D>& x ) noexcept;
(até C++20)
template< class T, class D >
bool operator!=( const unique_ptr<T, D>& x, std::nullptr_t ) noexcept;
(até C++20)
template< class T, class D >
bool operator!=( std::nullptr_t, const unique_ptr<T, D>& x ) noexcept;
(até C++20)
template< class T, class D >
bool operator<( const unique_ptr<T, D>& x, std::nullptr_t );
(constexpr desde C++23)
template< class T, class D >
bool operator<( std::nullptr_t, const unique_ptr<T, D>& y );
(constexpr desde C++23)
template< class T, class D >
bool operator<=( const unique_ptr<T, D>& x, std::nullptr_t );
(constexpr desde C++23)
template< class T, class D >
bool operator<=( std::nullptr_t, const unique_ptr<T, D>& y );
(constexpr desde C++23)
template< class T, class D >
bool operator>( const unique_ptr<T, D>& x, std::nullptr_t );
(constexpr desde C++23)
template< class T, class D >
bool operator>( std::nullptr_t, const unique_ptr<T, D>& y );
(constexpr desde C++23)
template< class T, class D >
bool operator>=( const unique_ptr<T, D>& x, std::nullptr_t );
(constexpr desde C++23)
template< class T, class D >
bool operator>=( std::nullptr_t, const unique_ptr<T, D>& y );
(constexpr desde C++23)
template< class T, class D >
requires std::three_way_comparable<typename unique_ptr<T, D>::pointer>
std::compare_three_way_result_t<typename unique_ptr<T, D>::pointer>
operator<=>( const unique_ptr<T, D>& x, std::nullptr_t );
(constexpr desde C++23)
```

Compara os valores dos ponteiros de dois `unique_ptr`s, ou de um `unique_ptr` e nullptr.

1-7) Compara dois `unique_ptr`s.

8-20) Compara um `unique_ptr` e nullptr.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **x, y** — `unique_ptr`s para comparar

### Valor de retorno

1) x.get() == y.get()

2) x.get() != y.get()

3) [std::less](<#/doc/utility/functional/less>)&lt;CT&gt;()(x.get(), y.get()), onde `CT` é [std::common_type](<#/doc/types/common_type>)<unique_ptr<T1, D1>::pointer, unique_ptr<T2, D2>::pointer>::type.

4) !(y < x)

5) y < x

6) !(x < y)

7) [std::compare_three_way](<#/doc/utility/compare/compare_three_way>){}(x.get(), y.get())

8,9) !x

10,11) (bool)x

12) [std::less](<#/doc/utility/functional/less>)<unique_ptr<T,D>::pointer>()(x.get(), nullptr)

13) [std::less](<#/doc/utility/functional/less>)<unique_ptr<T,D>::pointer>()(nullptr, y.get())

14) !(nullptr < x)

15) !(y < nullptr)

16) nullptr < x

17) y < nullptr

18) !(x < nullptr)

19) !(nullptr < y)

20) [std::compare_three_way](<#/doc/utility/compare/compare_three_way>){}(x.get(), static_cast<typename unique_ptr<T, D>::pointer>(nullptr))

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    int main()
    {
        std::unique_ptr<int> p1(new int(42));
        std::unique_ptr<int> p2(new int(42));
     
        std::cout << std::boolalpha
            << "(p1 == p1)       : " << (p1 == p1) << '\n'
            << "(p1 <=> p1) == 0 : " << ((p1 <=> p1) == 0) << '\n' // Since C++20
     
        // p1 and p2 point to different memory locations, so p1 != p2
            << "(p1 == p2)       : " << (p1 == p2) << '\n'
            << "(p1 < p2)        : " << (p1 < p2) << '\n'
            << "(p1 <=> p2) < 0  : " << ((p1 <=> p2) < 0) << '\n'   // Since C++20
            << "(p1 <=> p2) == 0 : " << ((p1 <=> p2) == 0) << '\n'; // Since C++20
    }
```

Saída possível:
```
    (p1 == p1)       : true
    (p1 <=> p1) == 0 : true
    (p1 == p2)       : false
    (p1 < p2)        : true
    (p1 <=> p2) < 0  : true
    (p1 <=> p2) == 0 : false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3426](<https://cplusplus.github.io/LWG/issue3426>) | C++20 | `operator<=>(unique_ptr, nullptr_t)` era malformado | restrições e definição corrigidas

### Veja também

[ get](<#/doc/memory/unique_ptr/get>) | retorna um ponteiro para o objeto gerenciado
(função membro pública)