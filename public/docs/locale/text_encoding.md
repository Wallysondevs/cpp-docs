# std::text_encoding

Definido no cabeçalho `[<text_encoding>](<#/doc/header/text_encoding>)`

```c
struct text_encoding;
```

A classe `text_encoding` fornece um mecanismo para identificar codificações de caracteres. Ela é usada para determinar a [codificação de literal de caractere comum](<#/doc/language/charset>) do ambiente de tradução em tempo de compilação e a codificação de caracteres do ambiente de execução em tempo de execução.

Cada objeto `text_encoding` encapsula um _esquema de codificação de caracteres_, identificado unicamente por um enumerador em [`text_encoding::id`](<#/doc/locale/text_encoding>) e um nome correspondente representado por uma string de bytes terminada em nulo. Estes podem ser acessados através das funções membro mib() e name(), respectivamente. A determinação se um objeto representa um esquema de codificação de caracteres implementado no ambiente de tradução ou de execução é definida pela implementação.

A classe `text_encoding` é um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>). O objeto array que representa o nome correspondente do esquema de codificação de caracteres está [aninhado dentro](<#/doc/language/objects>) do próprio objeto `text_encoding`. O nome armazenado é limitado a um máximo de [max_name_length](<#/doc/locale/text_encoding>) caracteres, excluindo o caractere nulo '\0'.

A classe suporta codificações de caracteres registradas e não registradas. Codificações registradas são aquelas encontradas no [IANA Character Sets Registry](<https://www.iana.org/assignments/character-sets/character-sets.xhtml>), excluindo as seguintes codificações de caracteres:

* NATS-DANO (33)
* NATS-DANO-ADD (34).

Além disso, a classe fornece acesso para codificações de caracteres registradas a:

1. _Nome primário_ : O nome oficial especificado no registro.
2. _Aliases_ : Um superconjunto de aliases do registro, definido pela implementação.
3. _Valor MIBenum_ : Um identificador único para uso na identificação de codificações de caracteres codificados.

Codificações não registradas podem ser representadas com um enumerador id::other ou id::unknown e um nome personalizado.

Um objeto `text_encoding` e cujo valor MIBenum não é id::other nem id::unknown mantém os seguintes invariantes:

* e.name() != '\0' é verdadeiro, e
* e.mib() == [std::text_encoding](<#/doc/locale/text_encoding>)(e.name()).mib() é verdadeiro.

### Tipos Membro

[ id](<#/doc/text/text_encoding/id>) | representa o valor MIBenum da codificação de caracteres
(enum membro público)
[ aliases_view](<#/doc/text/text_encoding/aliases_view>) | uma [`view`](<#/doc/ranges/view>) sobre aliases da codificação de caracteres
(classe membro pública)

### Constante Membro

Nome | Valor
---|---
constexpr [std::size_t](<#/doc/types/size_t>) max_name_length[static] | 63
(constante membro estática pública)

### Membros de Dados

Membro | Descrição
---|---
std::text_encoding::id `_mib__` (private) | um valor MIBenum com id::unknown como valor padrão
(objeto membro apenas para exposição*)
char[max_name_length + 1] `_name__` (private) | um nome primário armazenado
(objeto membro apenas para exposição*)

### Funções Membro

##### Criação

---
[ (constructor)](<https://en.cppreference.com/mwiki/index.php?title=cpp/text/text_encoding/text_encoding&action=edit&redlink=1> "cpp/text/text encoding/text encoding \(page does not exist\)") | constrói um novo objeto `text_encoding`
(função membro pública)
[ literal](<#/doc/text/text_encoding/literal>)[static] | constrói um novo `text_encoding` representando a [codificação de literal de caractere comum](<#/doc/language/charset>)
(função membro estática pública)
[ environment](<#/doc/text/text_encoding/environment>)[static] | constrói um novo `text_encoding` representando o esquema de codificação de caracteres definido pela implementação do ambiente de execução
(função membro estática pública)

##### Observadores

[ mib](<#/doc/text/text_encoding/mib>) | retorna o valor MIBenum da codificação de caracteres atual
(função membro pública)
[ name](<#/doc/text/text_encoding/name>) | retorna o nome primário da codificação de caracteres atual
(função membro pública)
[ aliases](<#/doc/text/text_encoding/aliases>) | retorna uma [`view`](<#/doc/ranges/view>) sobre aliases da codificação de caracteres atual
(função membro pública)
[ environment_is](<#/doc/text/text_encoding/environment_is>)[static] | verifica o esquema de codificação de caracteres do ambiente de execução com o valor MIB especificado
(função membro estática pública)

##### Funções Auxiliares

[_comp-name_](<#/doc/text/text_encoding/comp-name>)[static](private) | compara dois nomes de alias usando [Charset Alias Matching](<https://www.unicode.org/reports/tr22/tr22-8.html#Charset_Alias_Matching>)
(função membro estática apenas para exposição*)

### Funções Não-Membro

[ operator==(std::text_encoding)](<#/doc/text/text_encoding/operator_eq>)(C++26) | compara dois objetos `text_encoding`.
(função membro pública)

### Classes Auxiliares

[ std::hash<std::text_encoding>](<#/doc/text/text_encoding/hash>)(C++26) | suporte a hash para `std::text_encoding`
(especialização de template de classe)

### Notas

Ao trabalhar com codificações de caracteres, é importante notar que os nomes primários ou aliases de duas codificações de caracteres registradas distintas não são equivalentes quando comparados usando [Charset Alias Matching](<https://www.unicode.org/reports/tr22/tr22-8.html#Charset_Alias_Matching>), conforme descrito pelo Padrão Técnico Unicode.

Para conveniência, os enumeradores de `text_encoding::id` são introduzidos como membros de `text_encoding` e podem ser acessados diretamente. Isso significa que text_encoding::ASCII e text_encoding::id::ASCII se referem à mesma entidade.

Recomenda-se que a implementação trate as codificações registradas como não intercambiáveis. Além disso, o nome primário de uma codificação registrada não deve ser usado para descrever uma codificação não registrada similar, mas diferente, a menos que haja um precedente claro para tal.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_text_encoding`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | `std::text_encoding`

### Exemplo

Execute este código
```cpp
    #include <locale>
    #include <print>
    #include <text_encoding>
    
    int main()
    {
        // literal encoding is known at compile-time
        constexpr std::text_encoding literal_encoding = std::text_encoding::literal();
    
        // check for literal encoding
        static_assert(literal_encoding.mib() != std::text_encoding::other &&
                      literal_encoding.mib() != std::text_encoding::unknown);
    
        // environment encoding is only known at runtime
        std::text_encoding env_encoding = std::text_encoding::environment();
    
        // associated encoding of the default locale
        std::text_encoding locale_encoding = std::locale("").encoding();
    
        std::println("The literal encoding is {}", literal_encoding.name());
        std::println("The aliases of literal encoding:");
        for (const char* alias_name : literal_encoding.aliases())
            std::println(" -> {}", alias_name);
    
        if (env_encoding == locale_encoding)
            std::println("Both environment and locale encodings are the same");
    
        std::println("The environment encoding is {}", env_encoding.name());
        std::println("The aliases of environment encoding:");
        for (const char* alias_name : env_encoding.aliases())
            std::println(" -> {}", alias_name);
    }
```

Saída possível:
```
    The literal encoding is UTF-8
    The aliases of literal encoding:
     -> UTF-8
     -> csUTF8
    Both environment and locale encodings are the same
    The environment encoding is ANSI_X3.4-1968
    The aliases of environment encoding:
     -> US-ASCII
     -> iso-ir-6
     -> ANSI_X3.4-1968
     -> ANSI_X3.4-1986
     -> ISO_646.irv:1991
     -> ISO646-US
     -> us
     -> IBM367
     -> cp367
     -> csASCII
     -> ASCII
```

### Veja também

[ locale](<#/doc/locale/locale>) | conjunto de facets polimórficos que encapsulam diferenças culturais
(classe)