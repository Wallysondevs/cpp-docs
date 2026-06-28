# std::rend, std::crend

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
Definido no cabeçalho `<deque>`
Definido no cabeçalho `<flat_map>`
Definido no cabeçalho `<flat_set>`
Definido no cabeçalho `<forward_list>`
Definido no cabeçalho `<inplace_vector>`
Definido no cabeçalho `<iterator>`
Definido no cabeçalho `<list>`
Definido no cabeçalho `<map>`
Definido no cabeçalho `<regex>`
Definido no cabeçalho `<set>`
Definido no cabeçalho `<span>`
Definido no cabeçalho `<string>`
Definido no cabeçalho `<string_view>`
Definido no cabeçalho `<unordered_map>`
Definido no cabeçalho `<unordered_set>`
Definido no cabeçalho `<vector>`
template< class C >
auto rend( C& c ) -> decltype(c.rend());
(constexpr desde C++17)
template< class C >
auto rend( const C& c ) -> decltype(c.rend());
(constexpr desde C++17)
template< class T, std::size_t N >
std::reverse_iterator<T*> rend( T (&array)[N] );
(constexpr desde C++17)
template< class T >
std::reverse_iterator<const T*> rend( std::initializer_list<T> il );
(constexpr desde C++17)
template< class C >
auto crend( const C& c ) -> decltype(std::rend(c));
(constexpr desde C++17)
```

Retorna um iterator para o fim reverso do range fornecido.

1,2) Retorna c.rend(), que é tipicamente um iterator uma posição após o fim reverso da sequência representada por c.

1) Se `C` é um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::reverse_iterator`.

2) Se `C` é um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_reverse_iterator`.

3) Retorna um objeto [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<T*> para o fim reverso do array.

4) Retorna um objeto [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;const T*&gt; para o fim reverso de il.

5) Retorna [std::end](<#/doc/iterator/end>)(c), com c sempre tratado como const-qualified.

Se `C` é um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_reverse_iterator`.

### Parâmetros

- **c** — um container ou view com uma função membro `rend`
- **array** — um array de tipo arbitrário
- **il** — um [std::initializer_list](<#/doc/utility/initializer_list>)

### Valor de retorno

1,2) c.rend()

3) [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<T*>(array)

4) [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;const T*&gt;(il.begin())

5) c.rend()

### Exceções

Pode lançar exceções definidas pela implementação.

### Sobrecargas

Sobrecargas personalizadas de `rend` podem ser fornecidas para classes e enumerações que não expõem uma função membro `rend()` adequada, mas que podem ser iteradas.

Sobrecargas de `rend` encontradas por [argument-dependent lookup](<#/doc/language/adl>) podem ser usadas para personalizar o comportamento de std::[ranges::rend](<#/doc/ranges/rend>) e [std::ranges::crend](<#/doc/ranges/crend>). | (desde C++20)

### Observações

A sobrecarga para [std::initializer_list](<#/doc/utility/initializer_list>) é necessária porque ele não possui uma função membro `rend`.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        int a[]{4, 6, -3, 9, 10};
        std::cout << "C-style array `a` backwards: ";
        std::copy(std::rbegin(a), std::rend(a), std::ostream_iterator<int>(std::cout, " "));
    
        auto il = {3, 1, 4};
        std::cout << "\nstd::initializer_list `il` backwards: ";
        std::copy(std::rbegin(il), std::rend(il), std::ostream_iterator<int>(std::cout, " "));
    
        std::vector<int> v{4, 6, -3, 9, 10};
        std::cout << "\nstd::vector `v` backwards: ";
        std::copy(std::rbegin(v), std::rend(v), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída:
```
    C-style array `a` backwards: 10 9 -3 6 4
    std::initializer_list `il` backwards: 4 1 3
    std::vector `v` backwards: 10 9 -3 6 4
```

### Veja também

[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)
[ ranges::rend](<#/doc/ranges/rend>)(C++20) | retorna um reverse end iterator para um range
(objeto de ponto de customização)
[ ranges::crend](<#/doc/ranges/crend>)(C++20) | retorna um reverse end iterator para um range somente leitura
(objeto de ponto de customização)