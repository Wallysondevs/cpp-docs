# std::operator+(std::basic_string)

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( const std::basic_string<CharT,Traits,Alloc>& lhs,
CharT rhs );
template< class CharT, class Traits, class Alloc >
constexpr std::basic_string<CharT,Traits,Alloc>
operator+( const std::basic_string<CharT,Traits,Alloc>& lhs,
std::type_identity_t<std::basic_string_view<CharT,Traits>> rhs );
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( CharT lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
constexpr std::basic_string<CharT,Traits,Alloc>
operator+( std::type_identity_t<std::basic_string_view<CharT,Traits>> lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( std::basic_string<CharT,Traits,Alloc>&& lhs,
std::basic_string<CharT,Traits,Alloc>&& rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( std::basic_string<CharT,Traits,Alloc>&& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( std::basic_string<CharT,Traits,Alloc>&& lhs,
const CharT* rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( std::basic_string<CharT,Traits,Alloc>&& lhs,
CharT rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
constexpr std::basic_string<CharT,Traits,Alloc>
operator+( std::basic_string<CharT,Traits,Alloc>&& lhs,
std::type_identity_t<std::basic_string_view<CharT,Traits>> rhs );
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( const std::basic_string<CharT,Traits,Alloc>& lhs,
std::basic_string<CharT,Traits,Alloc>&& rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( const CharT* lhs,
std::basic_string<CharT,Traits,Alloc>&& rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
std::basic_string<CharT,Traits,Alloc>
operator+( CharT lhs,
std::basic_string<CharT,Traits,Alloc>&& rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
constexpr std::basic_string<CharT,Traits,Alloc>
operator+( std::type_identity_t<std::basic_string_view<CharT,Traits>> lhs,
std::basic_string<CharT,Traits,Alloc>&& rhs );
```

Retorna uma string contendo caracteres de lhs seguidos pelos caracteres de rhs. Equivalente a:

1,2) [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> r = lhs; r.append(rhs); return r;

3) [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> r = lhs; r.push_back(rhs); return r;

4) [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> r = lhs; r.append(rhs); return r;

5) [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> r = rhs; r.insert(0, lhs); return r;

6) [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> r = rhs; r.insert(r.begin(), lhs); return r;

7) [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> r = rhs; r.insert(0, lhs); return r;

8) lhs.append(rhs); return std::move(lhs); exceto que tanto lhs quanto rhs são deixados em estados válidos, mas não especificados. Se lhs e rhs tiverem allocators iguais, a implementação pode mover de qualquer um.

9,10) lhs.append(rhs); return std::move(lhs);

11) lhs.push_back(rhs); return std::move(lhs);

12) lhs.append(rhs); return std::move(lhs);

13,14) rhs.insert(0, lhs); return std::move(rhs);

15) rhs.insert(rhs.begin(), lhs); return std::move(rhs);

16) rhs.insert(0, lhs); return std::move(rhs);

O allocator usado para o resultado é:
1-4) [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::select_on_container_copy_construction(lhs.get_allocator())
5-7) [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::select_on_container_copy_construction(rhs.get_allocator())
8-12) lhs.get_allocator()
13-16) rhs.get_allocator()
Em outras palavras:

  * Se um operando for um rvalue `basic_string`, seu allocator é usado.
  * Caso contrário, `select_on_container_copy_construction` é usado no allocator do operando `basic_string` lvalue.

Em cada caso, o operando esquerdo é preferido quando ambos são `basic_string`s da mesma categoria de valor. Para ([8-16](<#/>)), todos os operandos `basic_string` rvalue são deixados em estados válidos, mas não especificados. | (desde C++11)

### Parâmetros

- **lhs** — string, string view (desde C++26), caractere, ou ponteiro para o primeiro caractere em um array terminado em nulo
- **rhs** — string, string view (desde C++26), caractere, ou ponteiro para o primeiro caractere em um array terminado em nulo

### Valor de retorno

Uma string contendo caracteres de lhs seguidos pelos caracteres de rhs, usando o allocator determinado como acima (desde C++11).

### Observações

`operator+` deve ser usado com grande cautela quando allocators com estado estão envolvidos (como quando [std::pmr::string](<#/doc/string/basic_string>) é usado) (desde C++17). Antes de [P1165R1](<https://wg21.link/P1165R1>), o allocator usado para o resultado era determinado por acidente histórico e pode variar de sobrecarga para sobrecarga sem razão aparente. Além disso, para ([1-5](<#/>)), o comportamento de propagação do allocator varia entre as principais implementações da biblioteca padrão e difere do comportamento descrito no padrão. Como o allocator usado pelo resultado de `operator+` é sensível à categoria de valor, `operator+` não é associativo em relação à propagação do allocator:
```cpp
    using my_string = std::basic_string<char, std::char_traits<char>, my_allocator<char>>;
    my_string cat();
    const my_string& dog();
    
    my_string meow = /* ... */, woof = /* ... */;
    meow + cat() + /* ... */; // usa select_on_container_copy_construction no allocator de meow
    woof + dog() + /* ... */; // usa o allocator do valor de retorno de dog() em vez disso
    
    meow + woof + meow; // usa select_on_container_copy_construction no allocator de meow
    meow + (woof + meow); // usa SOCCC no allocator de woof em vez disso
```

Para uma cadeia de invocações de `operator+`, o allocator usado para o resultado final pode ser controlado prefixando um rvalue `basic_string` com o allocator desejado:
```cpp
    // usa my_favorite_allocator para o resultado final
    my_string(my_favorite_allocator) + meow + woof + cat() + dog();
```

```cpp
Para um controle melhor e portátil sobre allocators, funções membro como `append`, `insert`, e `operator+=` devem ser usadas em uma string de resultado construída com o allocator desejado.  // (desde C++11)
O uso de std::type_identity_t como parâmetro nas sobrecargas (4), (7), (12) e (16) garante que um objeto do tipo std::basic_string<CharT, Traits, Allocator> possa sempre ser concatenado a um objeto de um tipo `T` com uma conversão implícita para std::basic_string_view<CharT, Traits>, e vice-versa, de acordo com as regras de resolução de sobrecarga. | Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_string_view` | `202403` | (C++26) | Concatenação de strings e string views, sobrecargas (4), (7), (12), (16)
(desde C++26)
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <string_view>
    
    int main()
    {
        std::string s1 = "Hello";
        std::string s2 = "world";
        const char* end = "!\n";
        std::cout << s1 + ' ' + s2 + end;
    
        std::string_view water{" Water"};
        #if __cpp_lib_string_view >= 202403
        std::cout << s1 + water + s2 << end; // sobrecarga (4), depois (1)
        #else
        std::cout << s1 + std::string(water) + s2 << end; // OK, mas menos eficiente
        #endif
    }
```

Saída:
```
    Hello world!
    Hello Waterworld!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P1165R1](<https://wg21.link/P1165R1>) | C++11 | a propagação do allocator é aleatória e inconsistente | tornada mais consistente

### Veja também

[ operator+=](<#/>) | anexa caracteres ao final
(função membro pública)
[ append](<#/doc/string/basic_string/append>) | anexa caracteres ao final
(função membro pública)
[ insert](<#/doc/string/basic_string/insert>) | insere caracteres
(função membro pública)