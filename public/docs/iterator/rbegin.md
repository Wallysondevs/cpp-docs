# std::rbegin, std::crbegin

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
auto rbegin( C& c ) -> decltype(c.rbegin());
(constexpr desde C++17)
template< class C >
auto rbegin( const C& c ) -> decltype(c.rbegin());
(constexpr desde C++17)
template< class T, std::size_t N >
std::reverse_iterator<T*> rbegin( T (&array)[N] );
(constexpr desde C++17)
template< class T >
std::reverse_iterator<const T*> rbegin( std::initializer_list<T> il );
(constexpr desde C++17)
template< class C >
auto crbegin( const C& c ) -> decltype(std::rbegin(c));
(constexpr desde C++17)
```

Retorna um iterator para o início reverso do range fornecido.

1,2) Retorna c.rbegin(), que é tipicamente um iterator para o início reverso da sequência representada por c.

1) Se `C` for um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::reverse_iterator`.

2) Se `C` for um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_reverse_iterator`.

3) Retorna um objeto [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<T*> para o início reverso do array.

4) Retorna um objeto [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;const T*&gt; para o início reverso de il.

5) Retorna std::rbegin(c), com c sempre tratado como const-qualificado.

Se `C` for um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_reverse_iterator`.

### Parâmetros

- **c** — um container ou view com uma função membro `rbegin`
- **array** — um array de tipo arbitrário
- **il** — um [std::initializer_list](<#/doc/utility/initializer_list>)

### Valor de retorno

1,2) c.rbegin()

3) [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<T*>(array + N)

4) [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;const T*&gt;(il.end())

5) c.rbegin()

### Exceções

Pode lançar exceções definidas pela implementação.

### Sobrecargas

Sobrecargas personalizadas de `rbegin` podem ser fornecidas para classes e enumerações que não expõem uma função membro `rbegin()` adequada, mas que podem ser iteradas.

Sobrecargas de `rbegin` encontradas por [argument-dependent lookup](<#/doc/language/adl>) podem ser usadas para personalizar o comportamento de std::[ranges::rbegin](<#/doc/ranges/rbegin>) e [std::ranges::crbegin](<#/doc/ranges/crbegin>). | (desde C++20)

### Notas

A sobrecarga para [std::initializer_list](<#/doc/utility/initializer_list>) é necessária porque ela não possui uma função membro `rbegin`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {3, 1, 4};
        auto vi = std::rbegin(v); // the type of “vi” is std::vector<int>::reverse_iterator
        std::cout << "*vi = " << *vi << '\n';
    
        *std::rbegin(v) = 42; // OK: after assignment v[2] == 42
    //  *std::crbegin(v) = 13; // error: the location is read-only
    
        int a[] = {-5, 10, 15};
        auto ai = std::rbegin(a); // the type of “ai” is std::reverse_iterator<int*>
        std::cout << "*ai = " << *ai << '\n';
    
        auto il = {3, 1, 4};
        // the type of “it” below is std::reverse_iterator<int const*>:
        for (auto it = std::rbegin(il); it != std::rend(il); ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    *vi = 4
    *ai = 15
    4 1 3
```

### Veja também

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um iterator de fim reverso para um container ou array
(modelo de função)
[ ranges::rbegin](<#/doc/ranges/rbegin>)(C++20) | retorna um iterator reverso para um range
(objeto de ponto de customização)
[ ranges::crbegin](<#/doc/ranges/crbegin>)(C++20) | retorna um iterator reverso para um range somente leitura
(objeto de ponto de customização)