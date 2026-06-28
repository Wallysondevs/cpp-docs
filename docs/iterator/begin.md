# std::begin, std::cbegin

Definido no header `[<array>](<#/doc/header/array>)`

```cpp
Definido no header `<deque>`
Definido no header `<flat_map>`
Definido no header `<flat_set>`
Definido no header `<forward_list>`
Definido no header `<inplace_vector>`
Definido no header `<iterator>`
Definido no header `<list>`
Definido no header `<map>`
Definido no header `<regex>`
Definido no header `<set>`
Definido no header `<span>`
Definido no header `<string>`
Definido no header `<string_view>`
Definido no header `<unordered_map>`
Definido no header `<unordered_set>`
Definido no header `<vector>`
template< class C >
auto begin( C& c ) -> decltype(c.begin());  // (1) (desde C++11)
(constexpr desde C++17)
template< class C >
auto begin( const C& c ) -> decltype(c.begin());  // (2) (desde C++11)
(constexpr desde C++17)
template< class T, std::size_t N >
T* begin( T (&array)[N] );  // (3) (desde C++11)
(noexcept desde C++14)
(constexpr desde C++14)
template< class C >
constexpr auto cbegin( const C& c ) noexcept(/* veja abaixo */)
-> decltype(std::begin(c));  // (4) (desde C++14)
```

  
Retorna um iterator para o início do range fornecido. 

1,2) Retorna c.begin(), que é tipicamente um iterator para o início da sequência representada por c.

1) Se `C` é um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::iterator`.

2) Se `C` é um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_iterator`.

3) Retorna um ponteiro para o início do array.

4) Retorna std::begin(c), com c sempre tratado como const-qualified.

Se `C` é um [Container](<#/doc/named_req/Container>) padrão, retorna um objeto `C::const_iterator`.

### Parâmetros

c  |  \-  |  um container ou view com uma função membro `begin`   
---|---|---
array  |  \-  |  um array de tipo arbitrário   
  
### Valor de retorno

1,2) c.begin()

3) array

4) c.begin()

### Exceções

4)

Especificação `noexcept`: 

noexcept(noexcept(std::begin(c)))

### Sobrecargas

Sobrecargas personalizadas de `begin` podem ser fornecidas para classes e enumerações que não expõem uma função membro `begin()` adequada, mas que podem ser iteradas. As seguintes sobrecargas já são fornecidas pela standard library: 

[ std::begin(std::initializer_list)](<#/doc/utility/initializer_list/begin2>)(desde C++11) |  sobrecarrega **std::begin**   
(modelo de função)  
[ std::begin(std::valarray)](<#/doc/numeric/valarray/begin2>)(desde C++11) |  sobrecarrega **std::begin**   
(modelo de função)  
[ begin(std::filesystem::directory_iterator)end(std::filesystem::directory_iterator)](<#/doc/filesystem/directory_iterator/begin>)(desde C++17) |  suporte a loop for baseado em range   
(função)  
[ begin(std::filesystem::recursive_directory_iterator)end(std::filesystem::recursive_directory_iterator)](<#/doc/filesystem/recursive_directory_iterator/begin>) |  suporte a loop for baseado em range   
(função)  
  
Similar ao uso de `swap` (descrito em [Swappable](<#/doc/named_req/Swappable>)), o uso típico da função `begin` em contexto genérico é um equivalente de `using std::begin; begin(arg);`, o que permite que tanto as sobrecargas selecionadas por [ADL](<#/doc/language/adl>) para tipos definidos pelo usuário quanto os modelos de função da standard library apareçam no mesmo conjunto de sobrecarga. 
```cpp
    template<typename Container, typename Function>
    void for_each(Container&& cont, Function f)
    {
        using std::begin;
        auto it = begin(cont);
        using std::end;
        auto end_it = end(cont);
        while (it != end_it)
        {
            f(*it);
            ++it;
        }
    }
```

Sobrecargas de `begin` encontradas por [argument-dependent lookup](<#/doc/language/adl>) podem ser usadas para personalizar o comportamento de [std::ranges::begin](<#/doc/ranges/begin>), [std::ranges::cbegin](<#/doc/ranges/cbegin>), e outros objetos ponteiro de customização dependendo de [std::ranges::begin](<#/doc/ranges/begin>).  | (desde C++20)  
  
### Notas

As sobrecargas não-array refletem exatamente o comportamento de `C::begin`. Seus efeitos podem ser surpreendentes se a função membro não tiver uma implementação razoável. 

`std::cbegin` é introduzido para a unificação de acessos a range de membros e não-membros. Veja também [LWG issue 2128](<https://cplusplus.github.io/LWG/issue2128>). 

Se `C` é um view shallow-const, `std::cbegin` pode retornar um iterator mutável. Tal comportamento é inesperado para alguns usuários. Veja também [P2276](<https://wg21.link/P2276>) e [P2278](<https://wg21.link/P2278>). 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main() 
    {
        std::vector<int> v = {3, 1, 4};
        auto vi = std::begin(v);
        std::cout << std::showpos << *vi << '\n'; 
     
        int a[] = {-5, 10, 15};
        auto ai = std::begin(a);
        std::cout << *ai << '\n';
    }
```

Saída: 
```
    +3
    -5
```

### Veja também

[ endcend](<#/doc/iterator/end>)(desde C++11)(desde C++14) |  retorna um iterator para o fim de um container ou array   
(modelo de função)  
[ ranges::begin](<#/doc/ranges/begin>)(desde C++20) |  retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::cbegin](<#/doc/ranges/cbegin>)(desde C++20) |  retorna um iterator para o início de um range somente leitura  
(objeto de ponto de customização)