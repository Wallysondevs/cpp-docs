# std::end, std::cend

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
auto end( C& c ) -> decltype(c.end());
(constexpr desde C++17)
template< class C >
auto end( const C& c ) -> decltype(c.end());
(constexpr desde C++17)
template< class T, std::size_t N >
T* end( T (&array)[N] );
(noexcept desde C++14)
(constexpr desde C++14)
template< class C >
constexpr auto cend( const C& c ) noexcept(/* see below */)
-> decltype(std::end(c));
```

Retorna um iterador para o fim (ou seja, o elemento após o último elemento) do range fornecido.

1,2) Retorna c.end(), que é tipicamente um iterador um após o fim da sequência representada por c.

1) Se `C` for um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::iterator`.

2) Se `C` for um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_iterator`.

3) Retorna um ponteiro para o fim do array.

4) Retorna std::end(c), com c sempre tratado como const-qualificado.

Se `C` for um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_iterator`.

### Parâmetros

- **c** — um container ou view com uma função membro `end`
- **array** — um array de tipo arbitrário

### Valor de retorno

1,2) c.end()

3) array + N

4) c.end()

### Exceções

4)

Especificação `noexcept`:

noexcept(noexcept(std::end(c)))

### Sobrecargas

Sobrecargas personalizadas de `end` podem ser fornecidas para classes e enumerações que não expõem uma função membro `end()` adequada, mas que podem ser iteradas. As seguintes sobrecargas já são fornecidas pela standard library:

[ std::end(std::initializer_list)](<#/doc/utility/initializer_list/end2>)(C++11) | especializa **std::end**
(modelo de função)
[ std::end(std::valarray)](<#/doc/numeric/valarray/end2>)(C++11) | especializa **std::end**
(modelo de função)
[ begin(std::filesystem::directory_iterator)end(std::filesystem::directory_iterator)](<#/doc/filesystem/directory_iterator/begin>)(C++17) | suporte para loop for baseado em range
(função)
[ begin(std::filesystem::recursive_directory_iterator)end(std::filesystem::recursive_directory_iterator)](<#/doc/filesystem/recursive_directory_iterator/begin>) | suporte para loop for baseado em range
(função)

Similar ao uso de `swap` (descrito em [Swappable](<#/doc/named_req/Swappable>)), o uso típico da função `end` em contexto genérico é um equivalente a usar std::end; end(arg);, o que permite que tanto as sobrecargas selecionadas por [ADL](<#/doc/language/adl>) para tipos definidos pelo usuário quanto os modelos de função da standard library apareçam no mesmo conjunto de sobrecargas.
```cpp
    template<typename Container, typename Function>
    void for_each(Container&& cont, Function f)
    {
        using std::begin;
        auto it = begin(cont);
        using std::end;
        auto end_it = end(cont);
    
        for (; it != end_it; ++it)
            f(*it);
    }
```

Sobrecargas de `end` encontradas por [argument-dependent lookup](<#/doc/language/adl>) podem ser usadas para personalizar o comportamento de [std::ranges::end](<#/doc/ranges/end>), [std::ranges::cend](<#/doc/ranges/cend>), e outros objetos de ponto de personalização dependendo de [std::ranges::end](<#/doc/ranges/end>). | (desde C++20)

### Notas

As sobrecargas não-array refletem exatamente o comportamento de C::end(). Seus efeitos podem ser surpreendentes se a função membro não tiver uma implementação razoável.

`std::cend` é introduzido para unificação de acessos a range de membros e não-membros. Veja também [LWG issue 2128](<https://cplusplus.github.io/LWG/issue2128>).

Se `C` for um shallow-const view, `std::cend` pode retornar um iterator mutável. Tal comportamento é inesperado para alguns usuários. Veja também [P2276](<https://wg21.link/P2276>) e [P2278](<https://wg21.link/P2278>).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {3, 1, 4};
        if (std::find(std::begin(v), std::end(v), 5) != std::end(v))
            std::cout << "Found a 5 in vector v!\n";
    
        int w[] = {5, 10, 15};
        if (std::find(std::begin(w), std::end(w), 5) != std::end(w))
            std::cout << "Found a 5 in array w!\n";
    }
```

Saída:
```
    Found a 5 in array w!
```

### Veja também

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterador para o início de um container ou array
(modelo de função)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de personalização)
[ ranges::cend](<#/doc/ranges/cend>)(C++20) | retorna um sentinel indicando o fim de um range somente leitura
(objeto de ponto de personalização)