# std::wstring_convert&lt;Codecvt,Elem,Wide_alloc,Byte_alloc&gt;::wstring_convert

```cpp
wstring_convert() : wstring_convert( new Codecvt ) {}  // (1)
explicit wstring_convert( Codecvt* pcvt );  // (2)
wstring_convert( Codecvt* pcvt, state_type state );  // (3)
explicit wstring_convert( const byte_string& byte_err,
const wide_string& wide_err = wide_string() );  // (4)
wstring_convert( const std::wstring_convert& ) = delete;  // (5) (desde C++14)
```

Sobrecarga  | [Membros de dados](<#/doc/locale/wstring_convert>)
---|---
` _byte_err_string_` |  ` _wide_err_string_` | `_cvtptr_` | `_cvtstate_` | `_cvtcount_`  
(1) | [inicializado por padrão](<#/doc/language/default_initialization>) |  new Codecvt |  inicializado por padrão  |  não inicializado   
(2) | pcvt  
(3) | state  
(4) | byte_err | wide_err | new Codecvt | state_type()  
  
2,3) Se pcvt for um ponteiro nulo, o comportamento é indefinido.

5) O construtor de cópia é deletado, `wstring_convert` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

pcvt  |  \-  |  ponteiro para a facet de conversão   
---|---|---
state  |  \-  |  valor inicial do estado de deslocamento da conversão   
byte_err  |  \-  |  string estreita para exibir em erros   
wide_err  |  \-  |  string larga para exibir em erros   
  
### Exemplo

Execute este código
```cpp
    #include <codecvt>
    #include <locale>
    #include <utility>
    
    // wrapper de utilidade para adaptar facets ligadas a locale para wstring/wbuffer convert
    template<class Facet>
    struct deletable_facet : Facet
    {
        using Facet::Facet; // herda construtores
        ~deletable_facet() {}
    };
    
    int main()
    {
        // Conversão UTF-16le / UCS4
        std::wstring_convert
            <std::codecvt_utf16<char32_t, 0x10ffff, std::little_endian>> u16to32;
    
        // Conversão UTF-8 / string larga com mensagens personalizadas
        std::wstring_convert<std::codecvt_utf8<wchar_t>> u8towide("Error!", L"Error!");
    
        // Facet de conversão GB18030 / string larga
        using F = deletable_facet<std::codecvt_byname<wchar_t, char, std::mbstate_t>>;
        std::wstring_convert<F> gbtowide(new F("zh_CN.gb18030"));
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2175](<https://cplusplus.github.io/LWG/issue2175>) | C++11  | pcvt poderia ser um ponteiro nulo  | o comportamento é indefinido neste caso   
[LWG 2176](<https://cplusplus.github.io/LWG/issue2176>) | C++11  | construtores que aceitavam um único argumento eram implícitos  | tornados explícitos   
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | o construtor padrão era explícito  | tornado implícito 