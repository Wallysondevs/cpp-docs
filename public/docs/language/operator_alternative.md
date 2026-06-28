# Representações alternativas de operadores

O código-fonte C++ (e C) pode ser escrito em qualquer conjunto de caracteres de 7 bits não-ASCII que inclua o conjunto de caracteres invariantes [ISO 646:1983](<https://en.wikipedia.org/wiki/ISO_646> "enwiki:ISO 646"). No entanto, vários operadores e pontuadores C++ exigem caracteres que estão fora do conjunto de códigos ISO 646: `{, }, [, ], #, \, ^, |, ~`. Para poder usar codificações de caracteres onde alguns ou todos esses símbolos não existem (como o alemão [DIN 66003](<https://en.wikipedia.org/wiki/DIN_66003> "enwiki:DIN 66003")), C++ define as seguintes alternativas compostas por caracteres compatíveis com ISO 646.

### Tokens alternativos

Existem grafias alternativas para vários operadores e outros tokens que usam caracteres não-ISO646. Em todos os aspectos da linguagem, cada token alternativo se comporta exatamente da mesma forma que seu token primário, exceto por sua grafia (o [operador de stringification](<#/doc/preprocessor/replace>) pode tornar a grafia visível). Os tokens alternativos de duas letras são às vezes chamados de "digraphs". Apesar de ter quatro letras, %:%: também é considerado um digraph.

Primário | Alternativo
---|---
`&&` | [`and`](<#/doc/keyword/and>)
`&=` | [`and_eq`](<#/doc/keyword/and_eq>)
`&` | [`bitand`](<#/doc/keyword/bitand>)
`|` | [`bitor`](<#/doc/keyword/bitor>)
`~` | [`compl`](<#/doc/keyword/compl>)
`!` | [`not`](<#/doc/keyword/not>)
`!=` | [`not_eq`](<#/doc/keyword/not_eq>)
`||` | [`or`](<#/doc/keyword/or>)
`|=` | [`or_eq`](<#/doc/keyword/or_eq>)
`^` | [`xor`](<#/doc/keyword/xor>)
`^=` | [`xor_eq`](<#/doc/keyword/xor_eq>)
`{` | `<%`
`}` | `%>`
`[` | `<:`
`]` | `:>`
`#` | `%:`
`##` | `%:%:`

### Trigraphs (removidos em C++17)

Os seguintes grupos de três caracteres (trigraphs) são [analisados antes que comentários e literais de string sejam reconhecidos](<#/doc/language/translation_phases>), e cada ocorrência de um trigraph é substituída pelo caractere primário correspondente:

Primário | Trigraph
---|---
`{` | `??<`
`}` | `??>`
`[` | `??(`
`]` | `??)`
`#` | `??=`
`\` | `??/`
`^` | `??'`
`|` | `??!`
`~` | `??-`

Como os trigraphs são processados cedo, um comentário como // Will the next line be executed?????/ irá efetivamente comentar a linha seguinte, e o literal de string como "Enter date ??/??/??" é analisado como "Enter date \\\??".

### Notas

Os caracteres & e ! são invariantes sob ISO-646, mas alternativas são fornecidas para os tokens que usam esses caracteres de qualquer forma para acomodar conjuntos de caracteres históricos ainda mais restritivos.

Não há grafia alternativa (como eq) para o operador de igualdade == porque o caractere = estava presente em todos os conjuntos de caracteres suportados.

### Compatibilidade com C

As mesmas palavras são definidas na linguagem de programação C no arquivo de inclusão [`<iso646.h>`](<#/>) como macros. Como em C++ estas são incorporadas à linguagem, a versão C++ de [`<iso646.h>`](<#/doc/header/ciso646>), assim como [`<ciso646>`](<#/doc/header/ciso646>), não define nada. Os digraphs não-palavra (por exemplo, <%), no entanto, fazem parte da linguagem central e podem ser usados sem incluir nenhum header (caso contrário, seriam inutilizáveis em qualquer conjunto de caracteres que não possua #).

### Palavras-chave

[`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>), [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>), [`compl`](<#/doc/keyword/compl>), [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>), [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>), [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)

### Exemplo

O exemplo a seguir demonstra o uso de vários tokens alternativos.

Execute este código
```
    %:include <iostream>
     
    struct X
    <%
        compl X() <%%> // destructor
        X() <%%>
        X(const X bitand) = delete; // copy constructor
        // X(X and) = delete; // move constructor
     
        bool operator not_eq(const X bitand other)
        <%
           return this not_eq bitand other;
        %>
    %>;
     
    int main(int argc, char* argv<::>)
    <%
        // lambda with reference-capture:
        auto greet = <:bitand:>(const char* name)
        <%
            std::cout << "Hello " << name
                      << " from " << argv<:0:> << '\n';
        %>;
     
        if (argc > 1 and argv<:1:> not_eq nullptr)
            greet(argv<:1:>);
        else
            greet("Anon");
    %>
```

Saída possível:
```
    Hello Anon from ./a.out
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 5.5 Tokens alternativos [lex.digraph]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 5.5 Tokens alternativos [lex.digraph]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 5.5 Tokens alternativos [lex.digraph]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 2.4 Sequências de trigraph [lex.trigraph]

    

  * 2.6 Tokens alternativos [lex.digraph]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 2.4 Sequências de trigraph [lex.trigraph]

    

  * 2.6 Tokens alternativos [lex.digraph]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 2.3 Sequências de trigraph [lex.trigraph]

    

  * 2.5 Tokens alternativos [lex.digraph]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 2.3 Sequências de trigraph [lex.trigraph]

    

  * 2.5 Tokens alternativos [lex.digraph]

### Veja também

[Documentação C](<#/>) para operadores e tokens alternativos
---