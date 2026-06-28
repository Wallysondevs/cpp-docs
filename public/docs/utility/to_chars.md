# std::to_chars

Definido no cabeçalho `[<charconv>](<#/doc/header/charconv>)`

```c
std::to_chars_result
to_chars( char* first, char* last,
/* integer-type */ value, int base = 10 );
(constexpr desde C++23)
std::to_chars_result
to_chars( char*, char*, bool, int = 10 ) = delete;
std::to_chars_result
to_chars( char* first, char* last, /* floating-point-type */ value );
std::to_chars_result
to_chars( char* first, char* last, /* floating-point-type */ value,
std::chars_format fmt );
std::to_chars_result
to_chars( char* first, char* last, /* floating-point-type */ value,
std::chars_format fmt, int precision );
```

Converte value em uma string de caracteres preenchendo sucessivamente o range `[`first`, `last`)`, onde `[`first`, `last`)` é requerido ser um [range válido](<#/doc/iterator>).

1) Formatadores de inteiros: value é convertido para uma string de dígitos na base fornecida (sem zeros iniciais redundantes). Dígitos no range `10..35` (inclusive) são representados como caracteres minúsculos `a..z`. Se value for menor que zero, a representação começa com um sinal de menos. A biblioteca fornece sobrecargas para todos os tipos inteiros assinados e não assinados cv-unqualified(desde C++23) e para o tipo char como o tipo do parâmetro value.

2) A sobrecarga para bool é deletada. `std::to_chars` rejeita argumentos do tipo bool porque o resultado seria "0"/"1" mas não "false"/"true" se fosse permitido.

3) value é convertido para uma string como se fosse por [std::printf](<#/doc/io/c/printf>) no locale padrão ("C"). O especificador de conversão é f ou e (resolvendo a favor de f em caso de empate), escolhido de acordo com o requisito para a representação mais curta: a representação da string consiste no menor número de caracteres tal que haja pelo menos um dígito antes do ponto decimal (se presente) e a análise da representação usando a função [`std::from_chars`](<#/doc/utility/from_chars>) correspondente recupera value exatamente. Se houver várias representações desse tipo, uma com a menor diferença para value é escolhida, resolvendo quaisquer empates restantes usando arredondamento de acordo com [std::round_to_nearest](<#/doc/types/numeric_limits/float_round_style>). A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante padrão cv-unqualified(até C++23) como o tipo do parâmetro value.

4) O mesmo que (3), mas a conversão especificada para o printf "as-if" é f se fmt for [`std::chars_format::fixed`](<#/doc/utility/chars_format>), e se fmt for [`std::chars_format::scientific`](<#/doc/utility/chars_format>), a (mas sem o "0x" inicial no resultado) se fmt for [`std::chars_format::hex`](<#/doc/utility/chars_format>), e g se fmt for [`chars_format::general`](<#/doc/utility/chars_format>). A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante padrão cv-unqualified(até C++23) como o tipo do parâmetro value.

5) O mesmo que (4), exceto que a precisão é especificada pelo parâmetro precision em vez do requisito de representação mais curta. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante padrão cv-unqualified(até C++23) como o tipo do parâmetro value.

### Parâmetros

- **first, last** — range de caracteres para escrever
- **value** — o valor a ser convertido para sua representação em string
- **base** — base inteira a ser usada: um valor entre 2 e 36 (inclusive).
- **fmt** — formatação de ponto flutuante a ser usada, uma bitmask do tipo [`std::chars_format`](<#/doc/utility/chars_format>)
- **precision** — precisão de ponto flutuante a ser usada

### Valor de retorno

Em caso de sucesso, retorna um valor do tipo [`std::to_chars_result`](<#/doc/utility/to_chars_result>) tal que `ec` é igual a [std::errc](<#/doc/error/errc>) inicializado por valor e `ptr` é o ponteiro um-além-do-final dos caracteres escritos. Note que a string _não_ é terminada em NUL.

Em caso de erro, retorna um valor do tipo [`std::to_chars_result`](<#/doc/utility/to_chars_result>) contendo [std::errc::value_too_large](<#/doc/error/errc>) em `ec`, uma cópia do valor last em `ptr`, e deixa o conteúdo do range `[`first`, `last`)` em estado não especificado.

### Exceções

Não lança exceções.

### Notas

Ao contrário de outras funções de formatação em bibliotecas C++ e C, `std::to_chars` é independente de locale, não aloca memória e não lança exceções. Apenas um pequeno subconjunto de políticas de formatação usadas por outras bibliotecas (como [std::sprintf](<#/doc/io/c/printf>)) é fornecido. Isso visa permitir a implementação mais rápida possível que seja útil em contextos comuns de alto throughput, como intercâmbio baseado em texto ([JSON](<https://en.wikipedia.org/wiki/JSON> "enwiki:JSON") ou [XML](<https://en.wikipedia.org/wiki/XML> "enwiki:XML")).

A garantia de que [`std::from_chars`](<#/doc/utility/from_chars>) pode recuperar exatamente cada valor de ponto flutuante formatado por `std::to_chars` é fornecida apenas se ambas as funções forem da mesma implementação.

É necessário fazer um cast explícito de um valor bool para outro tipo inteiro se for desejado formatar o valor como "0"/"1".

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_to_chars`](<#/doc/feature_test>) | [`201611L`](<#/>) | (C++17) | Conversões elementares de string (`std::to_chars`, [`std::from_chars`](<#/doc/utility/from_chars>))
[`202306L`](<#/>) | (C++26) | Testando o sucesso ou falha das funções de [`<charconv>`](<#/doc/header/charconv>)
[`__cpp_lib_constexpr_charconv`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Adiciona modificadores constexpr a `std::to_chars` e sobrecargas de [`std::from_chars`](<#/doc/utility/from_chars>) ([1](<#/doc/utility/to_chars>)) para tipos integrais

### Exemplo

Execute este código
```cpp
    #include <charconv>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    #include <system_error>
    
    void show_to_chars(auto... format_args)
    {
        const size_t buf_size = 10;
        char buf[buf_size]{};
        std::to_chars_result result = std::to_chars(buf, buf + buf_size, format_args...);
    
        if (result.ec != std::errc())
            std::cout << std::make_error_code(result.ec).message() << '\n';
        else
        {
            std::string_view str(buf, result.ptr - buf);
            std::cout << std::quoted(str) << '\n';
        }
    }
    
    int main()
    {
        show_to_chars(42);
        show_to_chars(+3.14159F);
        show_to_chars(-3.14159, std::chars_format::fixed);
        show_to_chars(-3.14159, std::chars_format::scientific, 3);
        show_to_chars(3.1415926535, std::chars_format::fixed, 10);
    }
```

Saída possível:
```
    "42"
    "3.14159"
    "-3.14159"
    "-3.142e+00"
    Value too large for defined data type
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2955](<https://cplusplus.github.io/LWG/issue2955>) | C++17 | esta função estava em [`<utility>`](<#/doc/header/utility>) e usava [std::error_code](<#/doc/error/error_code>) | movida para [`<charconv>`](<#/doc/header/charconv>) e usa [std::errc](<#/doc/error/errc>)
[LWG 3266](<https://cplusplus.github.io/LWG/issue3266>) | C++17 | argumento bool era aceito e promovido para int | rejeitado por uma sobrecarga deletada
[LWG 3373](<https://cplusplus.github.io/LWG/issue3373>) | C++17 | `std::to_chars_result` poderia ter membros adicionais | membros adicionais são proibidos

### Veja também

[ to_chars_result](<#/doc/utility/to_chars_result>)(C++17) | o tipo de retorno de `std::to_chars`
(classe)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)
[ to_string](<#/doc/string/basic_string/to_string>)(C++11) | converte um valor integral ou de ponto flutuante para `string`
(função)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) | insere dados formatados
(função membro pública de `std::basic_ostream<CharT,Traits>`)