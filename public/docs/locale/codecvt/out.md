# std::codecvt&lt;InternT,ExternT,StateT&gt;::out, do_out

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
result out( StateT& state,
const InternT* from,
const InternT* from_end,
const InternT*& from_next,
ExternT* to,
ExternT* to_end,
ExternT*& to_next ) const;
protected:
virtual result do_out( StateT& state,
const InternT* from,
const InternT* from_end,
const InternT*& from_next,
ExternT* to,
ExternT* to_end,
ExternT*& to_next ) const;
```

1) Função membro pública, chama a função membro `do_out` da classe mais derivada.

2) Se este facet `codecvt` define uma conversão, traduz os caracteres internos do range de origem `[`from`, `from_end`)` para caracteres externos, colocando os resultados nas localizações subsequentes a partir de `to`. Converte no máximo `from_end - from` caracteres internos e escreve no máximo `to_end - to` caracteres externos. Deixa `from_next` e `to_next` apontando um além do último elemento convertido com sucesso.

Se este facet `codecvt` não define uma conversão, nenhum caractere é convertido. `to_next` é definido como igual a `to`, `state` permanece inalterado, e [std::codecvt_base::noconv](<#/doc/locale/codecvt_base>) é retornado.

`do_out(state, from, from + 1, from_next, to, to_end, to_next)` deve retornar `ok` se

*   este facet `codecvt` for usado por [`basic_filebuf`](<#/doc/io/basic_filebuf>), e
*   `do_out(state, from, from_end, from_next, to, to_end, to_next)` retornaria `ok` onde `from != from_end`.

### Valor de retorno

Um valor do tipo [std::codecvt_base::result](<#/doc/locale/codecvt_base>), indicando o status de sucesso da seguinte forma:

`ok` | conversão concluída
---|---
`partial` | espaço insuficiente no buffer de saída ou fim inesperado do buffer de origem
`error` | encontrado um caractere que não pôde ser convertido
`noconv` | este facet não é de conversão, nenhuma saída escrita

A especialização não-conversora [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> sempre retorna [std::codecvt_base::noconv](<#/doc/locale/codecvt_base>).

### Notas

Requer que `from <= from_end && to <= to_end` e que `state` represente o estado de mudança inicial ou seja obtido pela conversão dos caracteres precedentes na sequência.

Embora `codecvt` suporte conversões N:M (por exemplo, UTF-16 para UTF-8, onde dois caracteres internos podem ser necessários para decidir quais caracteres externos produzir), [std::basic_filebuf](<#/doc/io/basic_filebuf>) só pode usar facets `codecvt` que definem uma conversão 1:N, ou seja, ele deve ser capaz de processar um caractere interno por vez ao escrever em um arquivo.

Ao realizar conversões N:M, esta função pode retornar [std::codecvt_base::partial](<#/doc/locale/codecvt_base>) após consumir todos os caracteres de origem (`from_next == from_end`). Isso significa que outro caractere interno é necessário para completar a conversão (por exemplo, ao converter UTF-16 para UTF-8, se o último caractere no buffer de origem for um *high surrogate*).

O efeito em `state` é deliberadamente não especificado. Em facets padrão, ele é usado para manter o estado de mudança (shift state), como ao chamar [std::wcsrtombs](<#/doc/string/multibyte/wcsrtombs>), e é, portanto, atualizado para refletir o estado de mudança após o último caractere convertido com sucesso, mas um facet definido pelo usuário é livre para usá-lo para manter qualquer outro estado, por exemplo, contar o número de caracteres especiais encontrados.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
     
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        auto& f = std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(std::locale());
        std::wstring internal = L"z\u00df\u6c34\U0001f34c"; // L"zß水🍌"
     
        // observe que o seguinte pode ser feito com wstring_convert
        std::mbstate_t mb{}; // estado de mudança inicial
        std::string external(internal.size() * f.max_length(), '\0'); 
        const wchar_t* from_next;
        char* to_next;
        f.out(mb, &internal[0], &internal[internal.size()], from_next,
                  &external[0], &external[external.size()], to_next);
        // verificação de erros omitida por brevidade
        external.resize(to_next - &external[0]);
     
        std::cout << "A string na codificação multibyte estreita: " << external << '\n';
    }
```

Saída:
```
    The string in narrow multibyte encoding: zß水🍌
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 76](<https://cplusplus.github.io/LWG/issue76>) | C++98 | não estava claro se a conversão é necessária para suportar a tomada de um caractere interno por vez | exigido apenas se usado por [`basic_filebuf`](<#/doc/io/basic_filebuf>)

### Veja também

[ overflow](<#/doc/io/basic_filebuf/overflow>)[virtual] | escreve caracteres para o arquivo associado a partir da área de inserção
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
[ to_bytes](<#/doc/locale/wstring_convert/to_bytes>) | converte uma string larga em uma string de bytes
(função membro pública de `std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>`)
[ wcsrtombs](<#/doc/string/multibyte/wcsrtombs>) | converte uma string larga para uma string de caracteres multibyte estreita, dado um estado
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida)