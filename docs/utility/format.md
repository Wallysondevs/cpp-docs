# Biblioteca de formatação (desde C++20)

A biblioteca de formatação de texto oferece uma alternativa segura e extensível à família de funções printf. Ela se destina a complementar a biblioteca de streams de E/S C++ existente.

### Especificações de formato

A especificação de formato define como os objetos são formatados com diferentes tipos de opções.

A formatação de objetos de tipos básicos e tipos de string padrão usa a [especificação de formato básica](<#/doc/utility/format/spec>). Outros componentes da biblioteca também podem fornecer suas próprias especificações de formato, veja [aqui](<#/doc/utility/format/basic_format_string>) para detalhes.

### Funções de formatação

Definido no header `[<format>](<#/doc/header/format>)`
---
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ format_to](<#/doc/utility/format/format_to>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída
(modelo de função)
[ format_to_n](<#/doc/utility/format/format_to_n>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída, não excedendo o tamanho especificado
(modelo de função)
[ formatted_size](<#/doc/utility/format/formatted_size>)(C++20) | determina o número de caracteres necessários para armazenar a representação formatada de seus argumentos
(modelo de função)

### Strings de formato

Definido no header `[<format>](<#/doc/header/format>)`
---
[ basic_format_stringformat_stringwformat_string](<#/doc/utility/format/basic_format_string>)(C++20)(C++20)(C++20) | modelo de classe que realiza verificações de string de formato em tempo de compilação no momento da construção
(modelo de classe)
[ runtime_format](<#/doc/utility/format/runtime_format>)(C++26) | cria strings de formato em tempo de execução diretamente utilizáveis em funções de formatação orientadas ao usuário
(função)

### Conceitos de formatação

Definido no header `[<format>](<#/doc/header/format>)`
---
[ formattable](<#/doc/utility/format/formattable>)(C++23) | especifica que um tipo é formatável, ou seja, ele especializa [std::formatter](<#/doc/utility/format/formatter>) e fornece as funções membro `parse` e `format`
(concept)

### Suporte à extensibilidade e detalhe de implementação

Definido no header `[<format>](<#/doc/header/format>)`
---
[ vformat](<#/doc/utility/format/vformat>)(C++20) | variante não-template de [std::format](<#/doc/utility/format/format>) usando representação de argumento com tipo apagado
(função)
[ vformat_to](<#/doc/utility/format/vformat_to>)(C++20) | variante não-template de [std::format_to](<#/doc/utility/format/format_to>) usando representação de argumento com tipo apagado
(modelo de função)
[ make_format_argsmake_wformat_args](<#/doc/utility/format/make_format_args>)(C++20)(C++20) | cria um objeto com tipo apagado referenciando todos os argumentos de formatação, conversível para `format_args`
(modelo de função)
[ visit_format_arg](<#/doc/utility/format/visit_format_arg>)(C++20) (deprecated em C++26) | interface de visitação de argumento para formatadores definidos pelo usuário
(modelo de função)
[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(modelo de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | modelo de classe que auxilia na implementação de especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range
(modelo de classe)
[ enable_nonlocking_formatter_optimization](<#/doc/utility/format/enable_nonlocking_formatter_optimization>)(C++23) | indica que o tipo de argumento pode ser impresso eficientemente
(modelo de variável)
[ range_format](<#/doc/utility/format/range_format>)(C++23) | especifica como um range deve ser formatado
(enum)
[ format_kind](<#/doc/utility/format/format_kind>)(C++23) | seleciona um std::range_format adequado para um range
(modelo de variável)
[ basic_format_arg](<#/doc/utility/format/basic_format_arg>)(C++20) | modelo de classe que fornece acesso a um argumento de formatação para formatadores definidos pelo usuário
(modelo de classe)
[ basic_format_argsformat_argswformat_args](<#/doc/utility/format/basic_format_args>)(C++20)(C++20)(C++20) | classe que fornece acesso a todos os argumentos de formatação
(modelo de classe)
[ basic_format_contextformat_contextwformat_context](<#/doc/utility/format/basic_format_context>)(C++20)(C++20)(C++20) | estado de formatação, incluindo todos os argumentos de formatação e o iterator de saída
(modelo de classe)
[ basic_format_parse_contextformat_parse_contextwformat_parse_context](<#/doc/utility/format/basic_format_parse_context>)(C++20)(C++20)(C++20) | estado do parser de string de formatação
(modelo de classe)
[ format_error](<#/doc/utility/format/format_error>)(C++20) | tipo de exceção lançada em erros de formatação
(classe)

### Itens auxiliares (desde C++23)

```cpp
template< class R, class CharT >
concept /*const-formattable-range*/ =
ranges::input_range<const R> &&
std::formattable<ranges::range_reference_t<const R>, CharT>;  // (1) (apenas para exposição*)
template< class R, class CharT >
using /*fmt-maybe-const*/ =
std::conditional_t</*const-formattable-range*/<R, CharT>, const R, R>;  // (2) (apenas para exposição*)
```

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_format`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Formatação de texto
[`202106L`](<#/>) | (C++23)
(DR20) | Verificações de string de formato em tempo de compilação;
Redução da parametrização de [std::vformat_to](<#/doc/utility/format/vformat_to>)
[`202110L`](<#/>) | (C++23)
---|---
(DR20) | Correção do tratamento de locale em formatadores chrono;
Suporte a tipos não-const-formattable
[`202207L`](<#/>) | (C++23)
---|---
(DR20) | Exposição de std::basic_format_string;
Esclarecer o tratamento de codificações na formatação localizada de tipos chrono
[`202304L`](<#/>) | (C++26) | Formatação de ponteiros
---|---|---
[`202305L`](<#/>) | (C++26) | Verificação de tipo de argumentos de formato
[`202306L`](<#/>) | (C++26) | Membro [`std::basic_format_arg::visit`](<#/doc/utility/format/basic_format_arg>)
[`202311L`](<#/>) | (C++26) | String de formato em tempo de execução
[`202403L`](<#/>) | (C++26) | Imprimindo Linhas em Branco com std::println
[`202403L`](<#/>) | (C++26)
(DR23) | Permitir uma implementação eficiente de std::print | | Esta seção está incompleta
Razão: o valor deve ser >= 202406L, ou seja, ser diferente do anterior
[`__cpp_lib_format_ranges`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Formatação de ranges
---|---|---|---
[`__cpp_lib_format_path`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Formatação de [std::filesystem::path](<#/doc/filesystem/path>)
[`__cpp_lib_format_uchar`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Correção da formatação de unidades de código como inteiros
[`__cpp_lib_formatters`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | Formatação de [std::thread::id](<#/doc/thread/thread/id>) e std::stacktrace

Nós intencionalmente tratamos a adição de `std::basic_format_string` ([P2508](<https://wg21.link/P2508>)) como um relatório de defeito porque todas as implementações conhecidas disponibilizam esses componentes no modo C++20, embora não seja oficialmente categorizado assim.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <format>
    
    int main()
    {
        std::string message = std::format("The answer is {}.", 42);
        assert(message == "The answer is 42.");
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[P2418R2](<https://wg21.link/P2418R2>) | C++20 | objetos que não são nem const-formattable nem copiáveis
(como objetos tipo gerador) não são formatáveis | permitir a formatação desses objetos
(requisitos de formatador relaxados)
[P2508R1](<https://wg21.link/P2508R1>) | C++20 | não há nome visível para o usuário para esta facilidade | o nome `basic_format_string` é exposto

### Veja também

[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação **formatada** dos argumentos
(modelo de função)
[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(modelo de função)
[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | produz a representação **formatada** dos argumentos
(modelo de função)