# std::codecvt&lt;InternT,ExternT,StateT&gt;::in, std::codecvt&lt;InternT,ExternT,StateT&gt;::do_in

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
result in( StateT& state,
const ExternT* from,
const ExternT* from_end,
const ExternT*& from_next,
InternT* to,
InternT* to_end,
InternT*& to_next ) const;
protected:
virtual result do_in( StateT& state,
const ExternT* from,
const ExternT* from_end,
const ExternT*& from_next,
InternT* to,
InternT* to_end,
InternT*& to_next ) const;
```

1) Função membro pública, chama a função membro `do_in` da classe mais derivada.

2) Se esta *facet* `codecvt` define uma conversão, traduz os caracteres externos do *range* de origem `[`from`, `from_end`)` para caracteres internos, colocando os resultados nas localizações subsequentes a partir de `to`. Converte no máximo `from_end - from` caracteres externos e escreve no máximo `to_end - to` caracteres internos. Deixa `from_next` e `to_next` apontando para um elemento além do último elemento convertido com sucesso.

Se esta *facet* `codecvt` não define uma conversão, nenhum caractere é convertido. `to_next` é definido como igual a `to`, `state` permanece inalterado, e [std::codecvt_base::noconv](<#/doc/locale/codecvt_base>) é retornado.

`do_in(state, from, from_end, from_next, to, to + 1, to_next)` deve retornar `ok` se

*   esta *facet* `codecvt` é usada por [`basic_filebuf`](<#/doc/io/basic_filebuf>), e
*   `do_in(state, from, from_end, from_next, to, to_end, to_next)` retornaria `ok` onde `to != to_end`.

### Valor de retorno

Um valor do tipo [std::codecvt_base::result](<#/doc/locale/codecvt_base>), indicando o status de sucesso da seguinte forma:

`ok` | conversão concluída
---|---
`partial` | espaço insuficiente no buffer de saída ou fim inesperado do buffer de origem
`error` | encontrado um caractere que não pôde ser convertido
`noconv` | esta *facet* não é de conversão, nenhuma saída foi escrita

A especialização não-conversora [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> sempre retorna [std::codecvt_base::noconv](<#/doc/locale/codecvt_base>).

### Notas

Requer que `from <= from_end && to <= to_end` e que `state` represente o estado de *shift* inicial ou seja obtido pela conversão dos caracteres precedentes na sequência.

O efeito em `state` é deliberadamente não especificado. Em *facets* padrão, ele é usado para manter o estado de *shift*, como ao chamar [std::mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>), e é, portanto, atualizado para refletir o estado de conversão após o último caractere externo processado, mas uma *facet* definida pelo usuário é livre para usá-lo para manter qualquer outro estado, por exemplo, contar o número de caracteres especiais encontrados.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
    
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        auto const& f = std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
            std::locale());
        std::string external = "z\u00df\u6c34\U0001d10b"; // or u8"zß水𝄋"
                         // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b"
    
        // note that the following can be done with wstring_convert
        std::mbstate_t mb = std::mbstate_t(); // initial shift state
        std::wstring internal(external.size(), '\0'); 
        const char* from_next;
        wchar_t* to_next;
        f.in(mb, &external[0], &external[external.size()], from_next,
                 &internal[0], &internal[internal.size()], to_next);
        // error checking skipped for brevity
        internal.resize(to_next - &internal[0]);
    
        std::wcout << L"The string in wide encoding: " << internal << '\n';
    }
```

Saída:
```
    The string in wide encoding: zß水𝄋
```

### Defect reports

Os seguintes *defect reports* que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 76](<https://cplusplus.github.io/LWG/issue76>) | C++98 | não estava claro se a conversão é necessária para suportar a produção de um caractere interno por vez | somente exigido se usado por [`basic_filebuf`](<#/doc/io/basic_filebuf>)

### Veja também

[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
[ from_bytes](<#/doc/locale/wstring_convert/from_bytes>) | converte uma *byte string* em uma *wide string*
(função membro pública de `std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>`)
[ mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>) | converte uma *narrow multibyte character string* para *wide string*, dado o estado
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma *string* de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa *defect report* contra essa revisão