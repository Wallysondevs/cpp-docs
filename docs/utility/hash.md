# std::hash

Definido no cabeçalho `[<bitset>](<#/doc/header/bitset>)`

```c
Definido no cabeçalho `<coroutine>`
Definido no cabeçalho `<chrono>`
Definido no cabeçalho `<filesystem>`
Definido no cabeçalho `<functional>`
Definido no cabeçalho `<memory>`
Definido no cabeçalho `<optional>`
Definido no cabeçalho `<stacktrace>`
Definido no cabeçalho `<string>`
Definido no cabeçalho `<string_view>`
Definido no cabeçalho `<system_error>`
Definido no cabeçalho `<text_encoding>`
Definido no cabeçalho `<thread>`
Definido no cabeçalho `<typeindex>`
Definido no cabeçalho `<variant>`
Definido no cabeçalho `<vector>`
template< class Key >
struct hash;
```

Os containers associativos não ordenados [std::unordered_set](<#/doc/container/unordered_set>), [std::unordered_multiset](<#/doc/container/unordered_multiset>), [std::unordered_map](<#/doc/container/unordered_map>), [std::unordered_multimap](<#/doc/container/unordered_multimap>) usam especializações do template `std::hash` como a função hash padrão.

Dado um tipo `Key`, cada especialização `std::hash<Key>` é _habilitada_ ou _desabilitada_ :

*   Se `std::hash<Key>` não for fornecida pelo programa ou pelo usuário, ela é desabilitada.
*   Caso contrário, `std::hash<Key>` é habilitada se todas as seguintes condições forem satisfeitas:

    *   Todos os seguintes requisitos são satisfeitos:

        *   [Hash](<#/doc/named_req/Hash>) (com `Key` como o tipo do argumento da chamada de função)
        *   [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
        *   [CopyAssignable](<#/doc/named_req/CopyAssignable>)
        *   [Swappable](<#/doc/named_req/Swappable>)

    *   Dados os seguintes valores:

        *   h, um objeto do tipo `std::hash<Key>`.
        *   k1 e k2, objetos do tipo `Key`.

        Todos os seguintes requisitos são satisfeitos:

        *   Se k1 == k2 for verdadeiro, h(k1) == h(k2) também é verdadeiro.
        *   A menos que `std::hash<Key>` seja uma [especialização definida pelo programa](<#/doc/language/type-id>), h(k1) nunca lançará uma exceção.

*   Caso contrário, `std::hash<Key>` é desabilitada.

Especializações desabilitadas não satisfazem [Hash](<#/doc/named_req/Hash>), não satisfazem [FunctionObject](<#/doc/named_req/FunctionObject>), e os seguintes valores são todos falsos:

*   [std::is_default_constructible](<#/doc/types/is_default_constructible>)<std::hash&lt;Key&gt;>::value
*   [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)<std::hash&lt;Key&gt;>::value
*   [std::is_move_constructible](<#/doc/types/is_move_constructible>)<std::hash&lt;Key&gt;>::value
*   [std::is_copy_assignable](<#/doc/types/is_copy_assignable>)<std::hash&lt;Key&gt;>::value
*   [std::is_move_assignable](<#/doc/types/is_move_assignable>)<std::hash&lt;Key&gt;>::value

Em outras palavras, elas existem, mas não podem ser usadas.

### Tipos aninhados

| Nome | Definição |
|---|---|
| `argument_type` (obsoleto desde C++17) | `Key` |
| `result_type` (obsoleto desde C++17) | [std::size_t](<#/doc/types/size_t>) |
(até C++20)

### Funções membro

[ (construtor)](<#/doc/utility/hash/hash>) | constrói um objeto de função hash
(função membro pública)
[ operator()](<#/>) | calcula o hash do argumento
(função membro pública)

### Especializações da biblioteca padrão

Cada cabeçalho que declara o template `std::hash` também fornece especializações habilitadas de `std::hash` para os seguintes tipos:

*   todos os [tipos aritméticos](<#/doc/language/types>) cv-não qualificados
*   todos os [tipos de enumeração](<#/doc/language/enum>) cv-não qualificados
*   todos os [tipos de ponteiro](<#/doc/language/pointer>) cv-não qualificados
*   [std::nullptr_t](<#/doc/types/nullptr_t>)

Além disso, alguns cabeçalhos também fornecem outras especializações habilitadas de `std::hash` para tipos de biblioteca (veja [abaixo](<#/doc/utility/hash>)).

Para todas as especializações de `std::hash` fornecidas pela biblioteca padrão, exceto as seguintes, todas as suas funções membro são noexcept:

*   [`std::hash<std::optional>`](<#/doc/utility/optional/hash>)
*   [`std::hash<std::variant>`](<#/doc/utility/variant/hash>)
*   [`std::hash<std::unique_ptr>`](<#/doc/memory/unique_ptr/hash>)

|
*   [`std::hash<std::chrono::duration>`](<#/doc/chrono/duration/hash>)
*   [`std::hash<std::chrono::time_point>`](<#/doc/chrono/time_point/hash>)
*   [`std::hash<std::chrono::zoned_time>`](<#/doc/chrono/zoned_time/hash>)

| (desde C++26)
(desde C++17)

### Especializações para tipos de biblioteca

[ std::hash<std::coroutine_handle>](<#/doc/coroutine/coroutine_handle/hash>)(C++20) | suporte a hash para [`std::coroutine_handle`](<#/doc/coroutine/coroutine_handle>)
(especialização de template de classe)
[ std::hash<std::error_code>](<#/doc/error/error_code/hash>)(C++11) | suporte a hash para [`std::error_code`](<#/doc/error/error_code>)
(especialização de template de classe)
[ std::hash<std::error_condition>](<#/doc/error/error_condition/hash>)(C++17) | suporte a hash para [`std::error_condition`](<#/doc/error/error_condition>)
(especialização de template de classe)
[ std::hash<std::stacktrace_entry>](<#/doc/utility/stacktrace_entry/hash>)(C++23) | suporte a hash para [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>)
(especialização de template de classe)
[ std::hash<std::basic_stacktrace>](<#/doc/utility/basic_stacktrace/hash>)(C++23) | suporte a hash para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>)
(especialização de template de classe)
[ std::hash<std::optional>](<#/doc/utility/optional/hash>)(C++17) | suporte a hash para [`std::optional`](<#/doc/utility/optional>)
(especialização de template de classe)
[ std::hash<std::variant>](<#/doc/utility/variant/hash>)(C++17) | suporte a hash para [`std::variant`](<#/doc/utility/variant>)
(especialização de template de classe)
[ std::hash<std::monostate>](<#/doc/utility/variant/monostate>)(C++17) | suporte a hash para [std::monostate](<#/doc/utility/variant/monostate>)
(especialização de template de classe)
[ std::hash<std::bitset>](<#/doc/utility/bitset/hash>)(C++11) | suporte a hash para [`std::bitset`](<#/doc/utility/bitset>)
(especialização de template de classe)
[ std::hash<std::unique_ptr>](<#/doc/memory/unique_ptr/hash>)(C++11) | suporte a hash para [`std::unique_ptr`](<#/doc/memory/unique_ptr>)
(especialização de template de classe)
[ std::hash<std::shared_ptr>](<#/doc/memory/shared_ptr/hash>)(C++11) | suporte a hash para [`std::shared_ptr`](<#/doc/memory/shared_ptr>)
(especialização de template de classe)
[ std::hash<std::type_index>](<#/doc/types/type_index/hash>)(C++11) | suporte a hash para [`std::type_index`](<#/doc/types/type_index>)
(especialização de template de classe)
[ std::hash<std::basic_string>](<#/doc/string/basic_string/hash>)(C++11) | suporte a hash para strings
(especialização de template de classe)
[ std::hash<std::string_view>std::hash<std::wstring_view>std::hash<std::u8string_view>std::hash<std::u16string_view>std::hash<std::u32string_view>](<#/doc/string/basic_string_view/hash>)(C++17)(C++17)(C++20)(C++17)(C++17) | suporte a hash para string views
(especialização de template de classe)
[ std::hash<std::text_encoding>](<#/doc/text/text_encoding/hash>)(C++26) | suporte a hash para [`std::text_encoding`](<#/doc/locale/text_encoding>)
(especialização de template de classe)
[ std::hash<std::vector&lt;bool&gt;>](<#/doc/container/vector_bool/hash>)(C++11) | suporte a hash para [`std::vector<bool>`](<#/doc/container/vector_bool>)
(especialização de template de classe)
[ std::hash<std::filesystem::path>](<#/doc/filesystem/path/hash>)(C++17) | suporte a hash para [`std::filesystem::path`](<#/doc/filesystem/path>)
(especialização de template de classe)
[ std::hash<std::thread::id>](<#/doc/thread/thread/id/hash>)(C++11) | suporte a hash para [`std::thread::id`](<#/doc/thread/thread/id>)
(especialização de template de classe)
[ std::hash<std::chrono::duration>](<#/doc/chrono/duration/hash>)(C++26) | suporte a hash para [`std::chrono::duration`](<#/doc/chrono/duration>)
(especialização de template de classe)
[ std::hash<std::chrono::time_point>](<#/doc/chrono/time_point/hash>)(C++26) | suporte a hash para [`std::chrono::time_point`](<#/doc/chrono/time_point>)
(especialização de template de classe)
[ std::hash<std::chrono::day>](<#/doc/chrono/day/hash>)(C++26) | suporte a hash para [`std::chrono::day`](<#/doc/chrono/day>)
(especialização de template de classe)
[ std::hash<std::chrono::month>](<#/doc/chrono/month/hash>)(C++26) | suporte a hash para [`std::chrono::month`](<#/doc/chrono/month>)
(especialização de template de classe)
[ std::hash<std::chrono::year>](<#/doc/chrono/year/hash>)(C++26) | suporte a hash para [`std::chrono::year`](<#/doc/chrono/year>)
(especialização de template de classe)
[ std::hash<std::chrono::weekday>](<#/doc/chrono/weekday/hash>)(C++26) | suporte a hash para [`std::chrono::weekday`](<#/doc/chrono/weekday>)
(especialização de template de classe)
[ std::hash<std::chrono::weekday_indexed>](<#/doc/chrono/weekday_indexed/hash>)(C++26) | suporte a hash para [`std::chrono::weekday_indexed`](<#/doc/chrono/weekday_indexed>)
(especialização de template de classe)
[ std::hash<std::chrono::weekday_last>](<#/doc/chrono/weekday_last/hash>)(C++26) | suporte a hash para [`std::chrono::weekday_last`](<#/doc/chrono/weekday_last>)
(especialização de template de classe)
[ std::hash<std::chrono::month_day>](<#/doc/chrono/month_day/hash>)(C++26) | suporte a hash para [`std::chrono::month_day`](<#/doc/chrono/month_day>)
(especialização de template de classe)
[ std::hash<std::chrono::month_day_last>](<#/doc/chrono/month_day_last/hash>)(C++26) | suporte a hash para [`std::chrono::month_day_last`](<#/doc/chrono/month_day_last>)
(especialização de template de classe)
[ std::hash<std::chrono::month_weekday>](<#/doc/chrono/month_weekday/hash>)(C++26) | suporte a hash para [`std::chrono::month_weekday`](<#/doc/chrono/month_weekday>)
(especialização de template de classe)
[ std::hash<std::chrono::month_weekday_last>](<#/doc/chrono/month_weekday_last/hash>)(C++26) | suporte a hash para [`std::chrono::month_weekday_last`](<#/doc/chrono/month_weekday_last>)
(especialização de template de classe)
[ std::hash<std::chrono::year_month>](<#/doc/chrono/year_month/hash>)(C++26) | suporte a hash para [`std::chrono::year_month`](<#/doc/chrono/year_month>)
(especialização de template de classe)
[ std::hash<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_day`](<#/doc/chrono/year_month_day>)
(especialização de template de classe)
[ std::hash<std::chrono::year_month_day_last>](<#/doc/chrono/year_month_day_last/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_day_last`](<#/doc/chrono/year_month_day_last>)
(especialização de template de classe)
[ std::hash<std::chrono::year_month_weekday>](<#/doc/chrono/year_month_weekday/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_weekday`](<#/doc/chrono/year_month_weekday>)
(especialização de template de classe)
[ std::hash<std::chrono::year_month_weekday_last>](<#/doc/chrono/year_month_weekday_last/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_weekday_last`](<#/doc/chrono/year_month_weekday_last>)
(especialização de template de classe)
[ std::hash<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/hash>)(C++26) | suporte a hash para [`std::chrono::zoned_time`](<#/doc/chrono/zoned_time>)
(especialização de template de classe)
[ std::hash<std::chrono::leap_second>](<#/doc/chrono/leap_second/hash>)(C++26) | suporte a hash para [`std::chrono::leap_second`](<#/doc/chrono/leap_second>)
(especialização de template de classe)

### Notas

As funções hash reais são dependentes da implementação e não são obrigadas a satisfazer quaisquer outros critérios de qualidade, exceto os especificados acima. Notavelmente, algumas implementações usam funções hash triviais (identidade) que mapeiam um inteiro para si mesmo. Em outras palavras, essas funções hash são projetadas para funcionar com containers associativos não ordenados, mas não como hashes criptográficos, por exemplo.

As funções hash são apenas obrigadas a produzir o mesmo resultado para a mesma entrada dentro de uma única execução de um programa; isso permite hashes com 'sal' que previnem ataques de negação de serviço por colisão.

Não há especialização para strings C. `std::hash<const char*>` produz um hash do valor do ponteiro (o endereço de memória), ele não examina o conteúdo de nenhum array de caracteres.

Especializações adicionais para [std::pair](<#/doc/utility/pair>) e os tipos de container padrão, bem como funções utilitárias para compor hashes, estão disponíveis em [`boost::hash`](<https://www.boost.org/doc/libs/release/libs/container_hash/doc/html/hash.html#ref>).

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <unordered_set>
    
    struct S
    {
        std::string first_name;
        std::string last_name;
        bool operator==(const S&) const = default; // desde C++20
    };
    
    // Antes do C++20.
    // bool operator==(const S& lhs, const S& rhs)
    // {
    //     return lhs.first_name == rhs.first_name && lhs.last_name == rhs.last_name;
    // }
    
    // Um hash personalizado pode ser um objeto de função autônomo.
    struct MyHash
    {
        std::size_t operator()(const S& s) const noexcept
        {
            std::size_t h1 = std::hash<std::string>{}(s.first_name);
            std::size_t h2 = std::hash<std::string>{}(s.last_name);
            return h1 ^ (h2 << 1); // ou use boost::hash_combine
        }
    };
    
    // A especialização personalizada de std::hash pode ser injetada no namespace std.
    template<>
    struct std::hash<S>
    {
        std::size_t operator()(const S& s) const noexcept
        {
            std::size_t h1 = std::hash<std::string>{}(s.first_name);
            std::size_t h2 = std::hash<std::string>{}(s.last_name);
            return h1 ^ (h2 << 1); // ou use boost::hash_combine
        }
    };
    
    int main()
    {
        std::string str = "Meet the new boss...";
        std::size_t str_hash = std::hash<std::string>{}(str);
        std::cout << "hash(" << std::quoted(str) << ") =\t" << str_hash << '\n';
    
        S obj = {"Hubert", "Farnsworth"};
        // Usando o objeto de função autônomo.
        std::cout << "hash(" << std::quoted(obj.first_name) << ", "
                  << std::quoted(obj.last_name) << ") =\t"
                  << MyHash{}(obj) << " (usando MyHash) ou\n\t\t\t\t"
                  << std::hash<S>{}(obj) << " (usando especialização injetada)\n";
    
        // O hash personalizado torna possível usar tipos personalizados em containers não ordenados.
        // O exemplo usará a especialização std::hash<S> injetada acima;
        // para usar MyHash em vez disso, passe-o como um segundo argumento de template.
        std::unordered_set<S> names = {obj, {"Bender", "Rodriguez"}, {"Turanga", "Leela"}};
        for (auto const& s: names)
            std::cout << std::quoted(s.first_name) << ' '
                      << std::quoted(s.last_name) << '\n';
    }
```

Saída possível:
```
    hash("Meet the new boss...") =  10656026664466977650
    hash("Hubert", "Farnsworth") =  12922914235676820612 (usando MyHash) ou
                                    12922914235676820612 (usando especialização injetada)
    "Bender" "Rodriguez"
    "Turanga" "Leela"
    "Hubert" "Farnsworth"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2119](<https://cplusplus.github.io/LWG/issue2119>) | C++11 | especializações para tipos inteiros estendidos estavam faltando | fornecido
[LWG 2148](<https://cplusplus.github.io/LWG/issue2148>) | C++11 | especializações para enumerações estavam faltando | fornecido
[LWG 2543](<https://cplusplus.github.io/LWG/issue2543>) | C++11 | `std::hash` pode não ser SFINAE-friendly | tornada SFINAE-friendly
[LWG 2817](<https://cplusplus.github.io/LWG/issue2817>) | C++11 | especialização para [std::nullptr_t](<#/doc/types/nullptr_t>) estava faltando | fornecido