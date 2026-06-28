# guias de dedução para std::basic_string

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class InputIt, class Alloc = std::allocator<
typename std::iterator_traits<InputIt>::value_type> >
basic_string( InputIt, InputIt, Alloc = Alloc() )
-> basic_string<typename std::iterator_traits<InputIt>::value_type,
std::char_traits<
typename std::iterator_traits<InputIt>::value_type>, Alloc>;
template< class CharT,
class Traits,
class Alloc = std::allocator<CharT> >
explicit basic_string( std::basic_string_view<CharT, Traits>, const Alloc& = Alloc() )
-> basic_string<CharT, Traits, Alloc>;
template< class CharT,
class Traits,
class Alloc = std::allocator<CharT>> >
basic_string( std::basic_string_view<CharT, Traits>,
typename /* see below */::size_type,
typename /* see below */::size_type,
const Alloc& = Alloc() )
-> basic_string<CharT, Traits, Alloc>;
template< ranges::input_range R,
class Alloc = std::allocator<ranges::range_value_t<R>> >
basic_string( std::from_range_t, R&&, Alloc = Alloc() )
-> basic_string<ranges::range_value_t<R>,
std::char_traits<ranges::range_value_t<R>>, Alloc>;
```

1) Este [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::basic_string](<#/doc/string/basic_string>) para permitir a dedução a partir de um range de iteradores. Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) e `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>).

2,3) Estes guias de dedução são fornecidos para [std::basic_string](<#/doc/string/basic_string>) para permitir a dedução a partir de um [std::basic_string_view](<#/doc/string/basic_string_view>). O tipo de parâmetro `size_type` em (3) refere-se ao tipo membro `size_type` do tipo deduzido pelo guia de dedução. Estas sobrecargas participam da resolução de sobrecarga apenas se `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>).

4) Este guia de dedução é fornecido para [std::basic_string](<#/doc/string/basic_string>) para permitir a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [`input_range`](<#/doc/ranges/input_range>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Notas

Guias ([2,3](<#/doc/string/basic_string/deduction_guides>)) são necessários porque os construtores de [std::basic_string](<#/doc/string/basic_string>) para [std::basic_string_view](<#/doc/string/basic_string_view>)s são feitos como templates para evitar causar ambiguidades em código existente, e esses templates não suportam dedução de argumentos de template de classe.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>); sobrecarga ([4](<#/doc/string/basic_string/deduction_guides>))

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::vector<char> v = {'a', 'b', 'c'};
        std::basic_string s1(v.begin(), v.end()); // usa o guia de dedução (1)
        assert(s1 == "abc");
    
    #if __cpp_lib_containers_ranges >= 202202L
        std::vector<wchar_t> v4{0x43, 43, 053, 0x32, 0x33};
        std::basic_string s4(std::from_range, v4); // usa o guia de dedução (4)
        assert(s4 == L"C++23");
    #endif
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3075](<https://cplusplus.github.io/LWG/issue3075>) | C++17 | dedução de `basic_string_view` não era suportada (exacerbado pelo [problema LWG 2946](<https://cplusplus.github.io/LWG/issue2946>)) | guias de dedução adicionados