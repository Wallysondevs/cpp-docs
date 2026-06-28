# operator==, !=, &lt;, &lt;=, &gt;, &gt;=, &lt;=&gt; (std::shared_ptr)

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Compara dois objetos `shared_ptr`.
template< class T, class U >
bool operator==( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
template< class T, class U >
bool operator!=( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
(até C++20)
template< class T, class U >
bool operator<( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
(até C++20)
template< class T, class U >
bool operator>( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
(até C++20)
template< class T, class U >
bool operator<=( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
(até C++20)
template< class T, class U >
bool operator>=( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
(até C++20)
template< class T, class U >
std::strong_ordering operator<=>( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) noexcept;
Compara um `shared_ptr` com um ponteiro nulo.
template< class T >
bool operator==( const std::shared_ptr<T>& lhs, std::nullptr_t ) noexcept;
template< class T >
bool operator==( std::nullptr_t, const std::shared_ptr<T>& rhs ) noexcept;
(até C++20)
template< class T >
bool operator!=( const std::shared_ptr<T>& lhs, std::nullptr_t ) noexcept;
(até C++20)
template< class T >
bool operator!=( std::nullptr_t, const std::shared_ptr<T>& rhs ) noexcept;
(até C++20)
template< class T >
bool operator<( const std::shared_ptr<T>& lhs, std::nullptr_t ) noexcept;
(até C++20)
template< class T >
bool operator<( std::nullptr_t, const std::shared_ptr<T>& rhs ) noexcept;
(até C++20)
template< class T >
bool operator>( const std::shared_ptr<T>& lhs, std::nullptr_t ) noexcept;
(até C++20)
template< class T >
bool operator>( std::nullptr_t, const std::shared_ptr<T>& rhs ) noexcept;
(até C++20)
template< class T >
bool operator<=( const std::shared_ptr<T>& lhs, std::nullptr_t ) noexcept;
(até C++20)
template< class T >
bool operator<=( std::nullptr_t, const std::shared_ptr<T>& rhs ) noexcept;
(até C++20)
template< class T >
bool operator>=( const std::shared_ptr<T>& lhs, std::nullptr_t ) noexcept;
(até C++20)
template< class T >
bool operator>=( std::nullptr_t, const std::shared_ptr<T>& rhs ) noexcept;
(até C++20)
template< class T >
std::strong_ordering operator<=>( const std::shared_ptr<T>& lhs,
std::nullptr_t ) noexcept;
```

Compara dois objetos `shared_ptr<T>` ou compara `shared_ptr<T>` com um ponteiro nulo.

Note que os operadores de comparação para `shared_ptr` simplesmente comparam valores de ponteiro; os objetos reais apontados _não_ são comparados. Ter `operator<` definido para `shared_ptr` permite que `shared_ptr`s sejam usados como chaves em containers associativos, como [std::map](<#/doc/container/map>) e [std::set](<#/doc/container/set>).

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de `operator<=>` e `operator==` respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs** — o `shared_ptr` do lado esquerdo para comparar
- **rhs** — o `shared_ptr` do lado direito para comparar

### Valor de retorno

1) lhs.get() == rhs.get()

2) !(lhs == rhs)

3) [std::less](<#/doc/utility/functional/less>)&lt;V&gt;()(lhs.get(), rhs.get()), onde V é o [tipo de ponteiro composto](<#/doc/language/operator_comparison>) de [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;::element_type* e [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;U&gt;::element_type*.

4) rhs < lhs

5) !(rhs < lhs)

6) !(lhs < rhs)

7) [std::compare_three_way](<#/doc/utility/compare/compare_three_way>){}(x.get(), y.get())

8) !lhs

9) !rhs

10) (bool)lhs

11) (bool)rhs

12) [std::less](<#/doc/utility/functional/less>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;::element_type*>()(lhs.get(), nullptr)

13) [std::less](<#/doc/utility/functional/less>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;::element_type*>()(nullptr, rhs.get())

14) nullptr < lhs

15) rhs < nullptr

16) !(nullptr < lhs)

17) !(rhs < nullptr)

18) !(lhs < nullptr)

19) !(nullptr < rhs)

20) [std::compare_three_way](<#/doc/utility/compare/compare_three_way>){}(x.get(), static_cast<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;::element_type*>(nullptr))

### Observações

Em todos os casos, é o ponteiro armazenado (aquele retornado por [get()](<#/doc/memory/shared_ptr/get>)) que é comparado, em vez do ponteiro gerenciado (aquele passado para o deleter quando [use_count](<#/doc/memory/shared_ptr/use_count>) chega a zero). Os dois ponteiros podem diferir em um [shared_ptr](<#/doc/memory/shared_ptr>) criado usando o construtor de aliasing.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    int main()
    {
        std::shared_ptr<int> p1(new int(42));
        std::shared_ptr<int> p2(new int(42));
     
        std::cout << std::boolalpha
            << "(p1 == p1)       : " << (p1 == p1) << '\n'
            << "(p1 <=> p1) == 0 : " << ((p1 <=> p1) == 0) << '\n'; // Desde C++20
     
        // p1 and p2 point to different memory locations, so p1 != p2
            std::cout << "(p1 == p2)       : " << (p1 == p2) << '\n'
            << "(p1 < p2)        : " << (p1 < p2) << '\n'
            << "(p1 <=> p2) < 0  : " << ((p1 <=> p2) < 0) << '\n'   // Desde C++20
            << "(p1 <=> p2) == 0 : " << ((p1 <=> p2) == 0) << '\n'; // Desde C++20
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

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3427](<https://cplusplus.github.io/LWG/issue3427>) | C++20 | `operator<=>(shared_ptr, nullptr_t)` estava malformado | definição corrigida

### Veja também

[ get](<#/doc/memory/shared_ptr/get>) | retorna o ponteiro armazenado
(função membro pública)