# Gramática de expressão regular ECMAScript modificada

Esta página descreve a gramática de expressão regular que é usada quando [std::basic_regex](<#/doc/regex/basic_regex>) é construído com [`syntax_option_type`](<#/doc/regex/syntax_option_type>) definido como `ECMAScript` (o padrão). Veja [`syntax_option_type`](<#/doc/regex/syntax_option_type>) para as outras gramáticas de expressão regular suportadas.

A gramática de expressão regular `ECMAScript` 3 em C++ é a [gramática ECMA-262](<https://ecma-international.org/ecma-262/5.1/#sec-15.10>) com modificações marcadas com (somente C++) abaixo.

### Visão Geral

A [gramática de expressão regular modificada](<https://eel.is/c++draft/re.grammar>) é principalmente a gramática RegExp do ECMAScript com uma expansão do tipo POSIX em locais sob _ClassAtom_. Algumas clarificações sobre verificações de igualdade e análise de números são feitas. Para muitos dos exemplos aqui, você pode tentar o equivalente no console do seu navegador:
```
    function match(s, re) { return s.match(new RegExp(re)); }
```

As "referências normativas" no padrão especificam o ECMAScript 3. Nós linkamos para a especificação do ECMAScript 5.1 aqui porque é uma versão com apenas pequenas mudanças em relação ao ECMAScript 3, e também possui uma versão HTML. Veja o [Guia MDN sobre JavaScript RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions>) para uma visão geral dos recursos do dialeto.

### Alternativas

Um padrão de expressão regular é uma sequência de uma ou mais _Alternativas_, separadas pelo operador de disjunção `|` (em outras palavras, o operador de disjunção tem a menor precedência).

_Pattern_ ::

    _Disjunction_

_Disjunction_ ::

    _Alternative_
    _Alternative_ `|` _Disjunction_

O padrão tenta primeiro pular a _Disjunção_ e casar a _Alternativa_ esquerda seguida pelo resto da expressão regular (após a Disjunção).

Se falhar, tenta pular a _Alternativa_ esquerda e casar a _Disjunção_ direita (seguida pelo resto da expressão regular).

Se a _Alternativa_ esquerda, a _Disjunção_ direita e o restante da expressão regular tiverem pontos de escolha, todas as escolhas no restante da expressão são tentadas antes de passar para a próxima escolha na _Alternativa_ esquerda. Se as escolhas na _Alternativa_ esquerda se esgotarem, a _Disjunção_ direita é tentada em vez da _Alternativa_ esquerda.

Quaisquer parênteses de captura dentro de uma _Alternativa_ ignorada produzem subcorrespondências vazias.

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    void show_matches(const std::string& in, const std::string& re)
    {
        std::smatch m;
        std::regex_search(in, m, std::regex(re));
        if (!m.empty())
        {
            std::cout << "input=[" << in << "], regex=[" << re << "]\n  "
                         "prefix=[" << m.prefix() << "]\n  smatch: ";
            for (std::size_t n = 0; n < m.size(); ++n)
                std::cout << "m[" << n << "]=[" << m[n] << "] ";
            std::cout << "\n  suffix=[" << m.suffix() << "]\n";
        }
        else
            std::cout << "input=[" << in << "], regex=[" << re << "]: NO MATCH\n";
    }
    
    int main()
    {
        show_matches("abcdef", "abc|def");
        show_matches("abc", "ab|abc"); // left Alternative matched first
    
        // Match of the input against the left Alternative (a) followed
        // by the remained of the regex (c|bc) succeeds, which results
        // in m[1]="a" and m[4]="bc".
        // The skipped Alternatives (ab) and (c) leave their submatches
        // m[3] and m[5] empty.
        show_matches("abc", "((a)|(ab))((c)|(bc))");
    }
```

Output:
```
    input=[abcdef], regex=[abc|def]
      prefix=[]
      smatch: m[0]=[abc]
      suffix=[def]
    input=[abc], regex=[ab|abc]
      prefix=[]
      smatch: m[0]=[ab]
      suffix=[c]
    input=[abc], regex=[((a)|(ab))((c)|(bc))]
      prefix=[]
      smatch: m[0]=[abc] m[1]=[a] m[2]=[a] m[3]=[] m[4]=[bc] m[5]=[] m[6]=[bc]
      suffix=[]
```

### Termos

Cada _Alternativa_ é vazia ou é uma sequência de _Termos_ (sem separadores entre os _Termos_)

_Alternative_ ::

     _[empty]_
     _Alternative_ _Term_

_Alternativa_ vazia sempre casa e não consome nenhuma entrada.

_Termos_ consecutivos tentam casar simultaneamente porções consecutivas da entrada.

Se a _Alternativa_ esquerda, o _Termo_ direito e o restante da expressão regular tiverem pontos de escolha, todas as escolhas no restante da expressão são tentadas antes de passar para a próxima escolha no _Termo_ direito, e todas as escolhas no _Termo_ direito são tentadas antes de passar para a próxima escolha na _Alternativa_ esquerda.

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    void show_matches(const std::string& in, const std::string& re)
    {
        std::smatch m;
        std::regex_search(in, m, std::regex(re));
        if (!m.empty())
        {
            std::cout << "input=[" << in << "], regex=[" << re << "]\n  "
                         "prefix=[" << m.prefix() << "]\n  smatch: ";
            for (std::size_t n = 0; n < m.size(); ++n)
                std::cout << "m[" << n << "]=[" << m[n] << "] ";
            std::cout << "\n  suffix=[" << m.suffix() << "]\n";
        }
        else
            std::cout << "input=[" << in << "], regex=[" << re << "]: NO MATCH\n";
    }
    
    int main()
    {
        show_matches("abcdef", ""); // empty regex is a single empty Alternative
        show_matches("abc", "abc|"); // left Alternative matched first
        show_matches("abc", "|abc"); // left Alternative matched first, leaving abc unmatched
    }
```

Output:
```
    input=[abcdef], regex=[]
      prefix=[]
      smatch: m[0]=[]
      suffix=[abcdef]
    input=[abc], regex=[abc|]
      prefix=[]
      smatch: m[0]=[abc]
      suffix=[]
    input=[abc], regex=[|abc]
      prefix=[]
      smatch: m[0]=[]
      suffix=[abc]
```

### Quantificadores

  * Cada _Termo_ é uma _Asserção_ (veja abaixo), ou um _Átomo_ (veja abaixo), ou um _Átomo_ imediatamente seguido por um _Quantificador_

_Term_ ::

     _Assertion_
     _Atom_
     _Atom_ _Quantifier_

Cada _Quantificador_ é um quantificador _guloso_ (que consiste em apenas um _QuantifierPrefix_) ou um quantificador _não guloso_ (que consiste em um _QuantifierPrefix_ seguido pelo ponto de interrogação `?`).

_Quantifier_ ::

     _QuantifierPrefix_
     _QuantifierPrefix_ `?`

Cada _QuantifierPrefix_ determina dois números: o número mínimo de repetições e o número máximo de repetições, como segue:

QuantifierPrefix | Mínimo | Máximo
---|---|---
`*` |  zero  |  infinito
`+` |  um  |  infinito
`?` |  zero  |  um
`{` _DecimalDigits_ `}` |  valor de DecimalDigits  |  valor de DecimalDigits
`{` _DecimalDigits_ `,` `}` |  valor de DecimalDigits  |  infinito
`{` _DecimalDigits_ `,` _DecimalDigits_ `}` |  valor de DecimalDigits antes da vírgula  |  valor de DecimalDigits depois da vírgula

Os valores dos _DecimalDigits_ individuais são obtidos chamando [std::regex_traits::value](<#/doc/regex/regex_traits/value>)(somente C++) em cada um dos dígitos.

Um _Átomo_ seguido por um _Quantificador_ é repetido o número de vezes especificado pelo _Quantificador_. Um _Quantificador_ pode ser _não guloso_, caso em que o padrão do _Átomo_ é repetido o menor número de vezes possível enquanto ainda casa o restante da expressão regular, ou pode ser _guloso_, caso em que o padrão do _Átomo_ é repetido o maior número de vezes possível enquanto ainda casa o restante da expressão regular.

O padrão do _Átomo_ é o que é repetido, não a entrada que ele casa, então diferentes repetições do _Átomo_ podem casar diferentes substrings de entrada.

Se o _Átomo_ e o restante da expressão regular tiverem pontos de escolha, o _Átomo_ é primeiro casado o maior número de vezes (ou o menor, se _não guloso_) possível. Todas as escolhas no restante da expressão regular são tentadas antes de passar para a próxima escolha na última repetição do _Átomo_. Todas as escolhas na última (n-ésima) repetição do _Átomo_ são tentadas antes de passar para a próxima escolha na penúltima (n–1)-ésima repetição do _Átomo_; neste ponto, pode-se descobrir que mais ou menos repetições do _Átomo_ são agora possíveis; estas são esgotadas (novamente, começando com o menor ou o maior número possível) antes de passar para a próxima escolha na (n-1)-ésima repetição do _Átomo_ e assim por diante.

As capturas do _Átomo_ são limpas cada vez que ele é repetido (veja o exemplo "(z)((a+)?(b+)?(c))*" abaixo)

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    void show_matches(const std::string& in, const std::string& re)
    {
        std::smatch m;
        std::regex_search(in, m, std::regex(re));
        if (!m.empty())
        {
            std::cout << "input=[" << in << "], regex=[" << re << "]\n  "
                         "prefix=[" << m.prefix() << "]\n  smatch: ";
            for (std::size_t n = 0; n < m.size(); ++n)
                std::cout << "m[" << n << "]=[" << m[n] << "] ";
            std::cout << "\n  suffix=[" << m.suffix() << "]\n";
        }
        else
            std::cout << "input=[" << in << "], regex=[" << re << "]: NO MATCH\n";
    }
    
    int main()
    {
        // casamento guloso, repete [a-z] 4 vezes
        show_matches("abcdefghi", "a[a-z]{2,4}");
        // casamento não guloso, repete [a-z] 2 vezes
        show_matches("abcdefghi", "a[a-z]{2,4}?");
    
        // A ordem dos pontos de escolha para quantificadores resulta em um casamento
        // com duas repetições, a primeira casando a substring "aa",
        // a segunda casando a substring "ba", deixando "ac" sem casamento
        // ("ba" aparece na cláusula de captura m[1])
        show_matches("aabaac", "(aa|aabaac|ba|b|c)*");
    
        // A ordem dos pontos de escolha para quantificadores faz com que esta regex
        // calcule o maior divisor comum entre 10 e 15
        // (a resposta é 5, e ela preenche m[1] com "aaaaa")
        show_matches("aaaaaaaaaa,aaaaaaaaaaaaaaa", "^(a+)\\1*,\\1+$");
    
        // a substring "bbb" não aparece na cláusula de captura m[4]
        // porque é limpa quando a segunda repetição do átomo
        // (a+)?(b+)?(c) está casando a substring "ac"
        // NOTA: o gcc erra isso - ele não limpa corretamente o
        // grupo de captura matches[4] conforme exigido por ECMA-262 21.2.2.5.1,
        // e, portanto, captura incorretamente "bbb" para esse grupo.
        show_matches("zaacbbbcac", "(z)((a+)?(b+)?(c))*");
    }
```

Output:
```
    input=[abcdefghi], regex=[a[a-z]{2,4}]
      prefix=[]
      smatch: m[0]=[abcde]
      suffix=[fghi]
    input=[abcdefghi], regex=[a[a-z]{2,4}?]
      prefix=[]
      smatch: m[0]=[abc]
      suffix=[defghi]
    input=[aabaac], regex=[(aa|aabaac|ba|b|c)*]
      prefix=[]
      smatch: m[0]=[aaba] m[1]=[ba]
      suffix=[ac]
    input=[aaaaaaaaaa,aaaaaaaaaaaaaaa], regex=[^(a+)\1*,\1+$]
      prefix=[]
      smatch: m[0]=[aaaaaaaaaa,aaaaaaaaaaaaaaa] m[1]=[aaaaa]
      suffix=[]
    input=[zaacbbbcac], regex=[(z)((a+)?(b+)?(c))*]
      prefix=[]
      smatch: m[0]=[zaacbbbcac] m[1]=[z] m[2]=[ac] m[3]=[a] m[4]=[] m[5]=[c] 
      suffix=[]
```

### Asserções

As _Asserções_ casam condições, em vez de substrings da string de entrada. Elas nunca consomem nenhum caractere da entrada. Cada _Asserção_ é uma das seguintes

_Assertion_ ::

     `^`
     `$`
     `\` `b`
     `\` `B`
     `(` `?` `=` _Disjunction_ `)`
     `(` `?` `!` _Disjunction_ `)`

A asserção `^` (início da linha) casa

1) A posição que imediatamente segue um caractere _LineTerminator_ (isso pode não ser suportado)(até C++17) (isso é garantido apenas se [`std::regex_constants::multiline`](<#/doc/regex/syntax_option_type>)(somente C++) estiver habilitado)(desde C++17)

2) O início da entrada (a menos que [std::regex_constants::match_not_bol](<#/doc/regex/match_flag_type>)(somente C++) esteja habilitado)

A asserção `$` (fim da linha) casa

1) A posição de um caractere _LineTerminator_ (isso pode não ser suportado)(até C++17)(isso é garantido apenas se [`std::regex_constants::multiline`](<#/doc/regex/syntax_option_type>)(somente C++) estiver habilitado)(desde C++17)

2) O fim da entrada (a menos que [std::regex_constants::match_not_eol](<#/doc/regex/match_flag_type>)(somente C++) esteja habilitado)

Nas duas asserções acima e no Átomo `.` abaixo, _LineTerminator_ é um dos quatro caracteres seguintes: `U+000A` (`\n` ou line feed), `U+000D` (`\r` ou carriage return), `U+2028` (separador de linha), ou `U+2029` (separador de parágrafo)

A asserção `\b` (limite de palavra) casa

1) O início de uma palavra (o caractere atual é uma letra, dígito ou sublinhado, e o caractere anterior não é)

2) O fim de uma palavra (o caractere atual não é uma letra, dígito ou sublinhado, e o caractere anterior é um desses)

3) O início da entrada se o primeiro caractere for uma letra, dígito ou sublinhado (a menos que [std::regex_constants::match_not_bow](<#/doc/regex/match_flag_type>)(somente C++) esteja habilitado)

4) O fim da entrada se o último caractere for uma letra, dígito ou sublinhado (a menos que [std::regex_constants::match_not_eow](<#/doc/regex/match_flag_type>)(somente C++) esteja habilitado)

A asserção `\B` (limite de palavra negativo) casa tudo EXCETO o seguinte

1) O início de uma palavra (o caractere atual é uma letra, dígito ou sublinhado, e o caractere anterior não é um desses ou não existe)

2) O fim de uma palavra (o caractere atual não é uma letra, dígito ou sublinhado (ou o casador está no fim da entrada), e o caractere anterior é um desses)

A asserção `(` `?` `=` _Disjunction_ `)` (lookahead positivo de largura zero) casa se _Disjunction_ casaria a entrada na posição atual

A asserção `(` `?` `!` _Disjunction_ `)` (lookahead negativo de largura zero) casa se _Disjunction_ NÃO casaria a entrada na posição atual.

Para ambas as asserções de Lookahead, ao casar a _Disjunção_, a posição não é avançada antes de casar o restante da expressão regular. Além disso, se a _Disjunção_ puder casar na posição atual de várias maneiras, apenas a primeira é tentada.

ECMAScript proíbe o backtracking em Disjunções de lookahead, o que afeta o comportamento das retroreferências em um lookahead positivo a partir do restante da expressão regular (veja o exemplo abaixo). Retroreferências em um lookahead negativo a partir do restante da expressão regular são sempre indefinidas (já que a Disjunção de lookahead deve falhar para prosseguir).

Nota: Asserções de Lookahead podem ser usadas para criar um AND lógico entre múltiplas expressões regulares (veja o exemplo abaixo).

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    void show_matches(const std::string& in, const std::string& re)
    {
        std::smatch m;
        std::regex_search(in, m, std::regex(re));
        if (!m.empty())
        {
            std::cout << "input=[" << in << "], regex=[" << re << "]\n  "
                         "prefix=[" << m.prefix() << "]\n  smatch: ";
            for (std::size_t n = 0; n < m.size(); ++n)
                std::cout << "m[" << n << "]=[" << m[n] << "] ";
            std::cout << "\n  suffix=[" << m.suffix() << "]\n";
        }
        else
            std::cout << "input=[" << in << "], regex=[" << re << "]: NO MATCH\n";
    }
    
    int main()
    {
        // casa o 'a' no final da entrada
        show_matches("aaa", "a$");
    
        // casa o 'o' no final da primeira palavra
        show_matches("moo goo gai pan", "o\\b");
    
        // o lookahead casa a string vazia imediatamente após o primeiro 'b'
        // isso preenche m[1] com "aaa" embora m[0] esteja vazio
        show_matches("baaabac", "(?=(a+))");
    
        // como o backtracking em lookaheads é proibido,
        // isso casa "aba" em vez de "aaaba"
        show_matches("baaabac", "(?=(a+))a*b\\1");
    
        // AND lógico via lookahead: esta senha casa SE contiver
        // pelo menos uma letra minúscula
        // E pelo menos uma letra maiúscula
        // E pelo menos um caractere de pontuação
        // E tiver pelo menos 6 caracteres de comprimento
        show_matches("abcdef", "(?=.*[[:lower:]])(?=.*[[:upper:]])(?=.*[[:punct:]]).{6,}");
        show_matches("aB,def", "(?=.*[[:lower:]])(?=.*[[:upper:]])(?=.*[[:punct:]]).{6,}");
    }
```

Output:
```
    input=[aaa], regex=[a$]
      prefix=[aa]
      smatch: m[0]=[a] 
      suffix=[]
    input=[moo goo gai pan], regex=[o\b]
      prefix=[mo]
      smatch: m[0]=[o] 
      suffix=[ goo gai pan]
    input=[baaabac], regex=[(?=(a+))]
      prefix=[b]
      smatch: m[0]=[] m[1]=[aaa] 
      suffix=[aaabac]
    input=[baaabac], regex=[(?=(a+))a*b\1]
      prefix=[baa]
      smatch: m[0]=[aba] m[1]=[a] 
      suffix=[c]
    input=[abcdef], regex=[(?=.*[[:lower:]])(?=.*[[:upper:]])(?=.*[[:punct:]]).{6,}]: NO MATCH
    input=[aB,def], regex=[(?=.*[[:lower:]])(?=.*[[:upper:]])(?=.*[[:punct:]]).{6,}]
      prefix=[]
      smatch: m[0]=[aB,def] 
      suffix=[]
```

### Átomos

Um _Átomo_ pode ser um dos seguintes:

_Atom_ ::

     _PatternCharacter_
     `.`
     `\` _AtomEscape_
     _CharacterClass_
     `(` _Disjunction_ `)`
     `(` `?` `:` _Disjunction_ `)`

onde _AtomEscape_ ::

     _DecimalEscape_
     _CharacterEscape_
     _CharacterClassEscape_

Diferentes tipos de átomos são avaliados de forma diferente.

### Subexpressões

O _Átomo_ `(` _Disjunction_ `)` é uma subexpressão marcada: ele executa a _Disjunção_ e armazena a cópia da substring de entrada que foi consumida pela _Disjunção_ no array de subcorrespondências no índice que corresponde ao número de vezes que o parêntese esquerdo `(` de subexpressões marcadas foi encontrado em toda a expressão regular neste ponto.

Além de serem retornadas em [std::match_results](<#/doc/regex/match_results>), as subcorrespondências capturadas são acessíveis como retroreferências (`\1`, `\2`, ...) e podem ser referenciadas em expressões regulares. Note que [std::regex_replace](<#/doc/regex/regex_replace>) usa `$` em vez de `\` para retroreferências (`$1`, `$2`, ...) da mesma maneira que `String.prototype.replace` (ECMA-262, parte 15.5.4.11).

O _Átomo_ `(` `?` `:` _Disjunction_ `)` (subexpressão não marcadora) simplesmente avalia a _Disjunção_ e não armazena seus resultados na subcorrespondência. Este é um agrupamento puramente lexical.

| Esta seção está incompleta
Razão: sem exemplo

### Retroreferências

_DecimalEscape_ ::

     _DecimalIntegerLiteral_ [_lookahead_ ∉ _DecimalDigit_]

Se `\` for seguido por um número decimal `N` cujo primeiro dígito não é `0`, então a sequência de escape é considerada uma _retroreferência_. O valor `N` é obtido chamando [std::regex_traits::value](<#/doc/regex/regex_traits/value>)(somente C++) em cada um dos dígitos e combinando seus resultados usando aritmética de base 10. É um erro se `N` for maior que o número total de parênteses de captura esquerdos em toda a expressão regular.

Quando uma retroreferência `\N` aparece como um _Átomo_, ela casa a mesma substring que está atualmente armazenada no N-ésimo elemento do array de subcorrespondências.

O escape decimal `\0` NÃO é uma retroreferência: é um escape de caractere que representa o caractere [ NUL](<#/doc/language/ascii>). Ele não pode ser seguido por um dígito decimal.

Como acima, note que [std::regex_replace](<#/doc/regex/regex_replace>) usa `$` em vez de `\` para retroreferências (`$1`, `$2`, ...).

| Esta seção está incompleta
Razão: sem exemplo

### Casamentos de caractere único

O _Átomo_ `.` casa e consome qualquer caractere da string de entrada, exceto por _LineTerminator_ (`U+000D`, `U+000A`, `U+2029`, ou `U+2028`)

O _Átomo_ _PatternCharacter_, onde _PatternCharacter_ é qualquer _SourceCharacter_ EXCETO os caracteres `^ $ \ . * + ? ( ) [ ] { } |`, casa e consome um caractere da entrada se for igual a este _PatternCharacter_.

A igualdade para este e todos os outros casamentos de caractere único é definida como segue:

1) Se [std::regex_constants::icase](<#/doc/regex/syntax_option_type>) estiver definido, os caracteres são iguais se os valores de retorno de [std::regex_traits::translate_nocase](<#/doc/regex/regex_traits/translate_nocase>) forem iguais (somente C++).

2) Caso contrário, se [std::regex_constants::collate](<#/doc/regex/syntax_option_type>) estiver definido, os caracteres são iguais se os valores de retorno de [std::regex_traits::translate](<#/doc/regex/regex_traits/translate>) forem iguais (somente C++).

3) Caso contrário, os caracteres são iguais se operator== retornar true.

Cada _Átomo_ que consiste no caractere de escape `\` seguido por _CharacterEscape_, bem como o DecimalEscape especial `\0`, casa e consome um caractere da entrada se for igual ao caractere representado pelo _CharacterEscape_. As seguintes sequências de escape de caractere são reconhecidas:

_CharacterEscape_ ::

     _ControlEscape_
     `c` _ControlLetter_
     _HexEscapeSequence_
     _UnicodeEscapeSequence_
     _IdentityEscape_

Aqui, _ControlEscape_ é um dos cinco caracteres seguintes: `f n r t v`

ControlEscape | Unidade de Código | Nome
---|---|---
`f` | U+000C  | form feed
`n` | U+000A  | new line
`r` | U+000D  | carriage return
`t` | U+0009  | horizontal tab
`v` | U+000B  | vertical tab

_ControlLetter_ é qualquer letra ASCII minúscula ou maiúscula e este escape de caractere casa o caractere cuja unidade de código é igual ao resto da divisão do valor da unidade de código de _ControlLetter_ por 32. Por exemplo, `\cD` e `\cd` ambos casam a unidade de código `U+0004` (EOT) porque 'D' é `U+0044` e 0x44 % 32 == 4, e 'd' é `U+0064` e 0x64 % 32 == 4.

_HexEscapeSequence_ é a letra `x` seguida por exatamente dois _HexDigit_ s (onde _HexDigit_ é um de `0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F`). Este escape de caractere casa o caractere cuja unidade de código é igual ao valor numérico do número hexadecimal de dois dígitos.

_UnicodeEscapeSequence_ é a letra `u` seguida por exatamente quatro _HexDigit_ s. Este escape de caractere casa o caractere cuja unidade de código é igual ao valor numérico deste número hexadecimal de quatro dígitos. Se o valor não couber no `CharT` deste [std::basic_regex](<#/doc/regex/basic_regex>), [std::regex_error](<#/doc/regex/regex_error>) é lançado (somente C++).

_IdentityEscape_ pode ser qualquer caractere não alfanumérico: por exemplo, outra barra invertida. Ele casa o caractere como está.

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    void show_matches(const std::wstring& in, const std::wstring& re)
    {
        std::wsmatch m;
        std::regex_search(in, m, std::wregex(re));
        if (!m.empty())
        {
            std::wcout << L"input=[" << in << L"], regex=[" << re << L"]\n  "
                          L"prefix=[" << m.prefix() << L"]\n  wsmatch: ";
            for (std::size_t n = 0; n < m.size(); ++n)
                std::wcout << L"m[" << n << L"]=[" << m[n] << L"] ";
            std::wcout << L"\n  suffix=[" << m.suffix() << L"]\n";
        }
        else
            std::wcout << L"input=[" << in << "], regex=[" << re << L"]: NO MATCH\n";
    }
    
    int main()
    {
        // A maioria dos escapes são semelhantes ao C++, exceto por metacaracteres. Você terá que
        // escapar duas vezes ou usar raw strings nas barras.
        show_matches(L"C++\\", LR"(C\+\+\\)");
    
        // Sequências de escape e NUL.
        std::wstring s(L"ab\xff\0cd", 5);
        show_matches(s, L"(\\0|\\u00ff)");
    
        // Nenhum casamento para Unicode não-BMP é definido, porque ECMAScript usa UTF-16
        // átomos. Se esta banana emoji casa pode depender da plataforma:
        // Estas precisam ser wide-strings!
        show_matches(L"\U0001f34c", L"[\\u0000-\\ufffe]+");
    }
```

Possible output:
```
    input=[C++\], regex=[C\+\+\\]
      prefix=[]
      wsmatch: m[0]=[C++\]
      suffix=[]
    input=[ab?c], regex=[(\0{{!}}\u00ff)]
      prefix=[ab]
      wsmatch: m[0]=[?] m[1]=[?]
      suffix=[c]
    input=[?], regex=[[\u0000-\ufffe]+]: NO MATCH
    
```

### Classes de caracteres

Um Átomo pode representar uma classe de caracteres, ou seja, ele casará e consumirá um caractere se pertencer a um dos grupos predefinidos de caracteres.

Uma classe de caracteres pode ser introduzida através de um escape de classe de caracteres:

_Atom_ ::

     `\` _CharacterClassEscape_

ou diretamente

_Atom_ ::

     _CharacterClass_

Os escapes de classe de caracteres são atalhos para algumas das classes de caracteres comuns, como segue:

CharacterClassEscape | Expressão ClassName(somente C++) | Significado
---|---|---
`d` |  `[[:digit:]]` |  dígitos
`D` |  `[^[:digit:]]` |  não-dígitos
`s` |  `[[:space:]]` |  caracteres de espaço em branco
`S` |  `[^[:space:]]` |  caracteres não-espaço em branco
`w` |  `[_[:alnum:]]` |  caracteres alfanuméricos e o caractere `_`
`W` |  `[^_[:alnum:]]` |  caracteres diferentes de alfanuméricos ou `_`
O significado exato de cada um desses escapes de classe de caracteres em C++ é definido em termos das classes de caracteres nomeadas dependentes do locale, e não listando explicitamente os caracteres aceitáveis como no ECMAScript.

Uma _CharacterClass_ é uma sequência de _ClassRanges_ entre colchetes, opcionalmente começando com o operador de negação `^`. Se começar com `^`, este _Átomo_ casa qualquer caractere que NÃO esteja no conjunto de caracteres representado pela união de todos os _ClassRanges_. Caso contrário, este _Átomo_ casa qualquer caractere que ESTEJA no conjunto de caracteres representado pela união de todos os _ClassRanges_.

_CharacterClass_ ::

     `[` `[` _lookahead ∉ {_`^`_}]_ _ClassRanges_ `]`
     `[` `^` _ClassRanges_ `]`

ClassRanges ::

     [empty]
     _NonemptyClassRanges_

_NonemptyClassRanges_ ::

     _ClassAtom_
     _ClassAtom_ _NonemptyClassRangesNoDash_
     _ClassAtom_ \- _ClassAtom_ _ClassRanges_

Se um range de classe não vazio tiver a forma `_ClassAtom_ - _ClassAtom_`, ele casa qualquer caractere de um range definido como segue: (somente C++)

O primeiro _ClassAtom_ deve casar um único elemento de ordenação `c1` e o segundo _ClassAtom_ deve casar um único elemento de ordenação `c2`. Para testar se o caractere de entrada `c` é casado por este range, os seguintes passos são tomados:

1) Se [std::regex_constants::collate](<#/doc/regex/syntax_option_type>) não estiver ativado, o caractere é casado por comparação direta de pontos de código: `c` é casado se `c1 <= c && c <= c2`

1) Caso contrário (se [std::regex_constants::collate](<#/doc/regex/syntax_option_type>) estiver habilitado):

1) Se [std::regex_constants::icase](<#/doc/regex/syntax_option_type>) estiver habilitado, todos os três caracteres (`c`, `c1` e `c2`) são passados para [std::regex_traits::translate_nocase](<#/doc/regex/regex_traits/translate_nocase>)

2) Caso contrário (se [std::regex_constants::icase](<#/doc/regex/syntax_option_type>) não estiver definido), todos os três caracteres (`c`, `c1` e `c2`) são passados para [std::regex_traits::translate](<#/doc/regex/regex_traits/translate>)

2) As strings resultantes são comparadas usando [std::regex_traits::transform](<#/doc/regex/regex_traits/transform>) e o caractere `c` é casado se `transformed c1 <= transformed c && transformed c <= transformed c2`

O caractere `-` é tratado literalmente se for

  * o primeiro ou último caractere de _ClassRanges_
  * o ClassAtom de início ou fim de uma especificação de range separada por traço
  * imediatamente segue uma especificação de range separada por traço.
  * escapado com uma barra invertida como um _CharacterEscape_

NonemptyClassRangesNoDash ::

     _ClassAtom_
     _ClassAtomNoDash_ _NonemptyClassRangesNoDash_
     _ClassAtomNoDash_ \- _ClassAtom_ _ClassRanges_

_ClassAtom_ ::

     `-`
     _ClassAtomNoDash_
     _ClassAtomExClass_(somente C++)
     _ClassAtomCollatingElement_(somente C++)
     _ClassAtomEquivalence_(somente C++)

ClassAtomNoDash ::

     _SourceCharacter_ mas não um de `\ ou ] ou -`
     `\` _ClassEscape_

Cada _ClassAtomNoDash_ representa um único caractere -- seja _SourceCharacter_ como está ou escapado como segue:

ClassEscape ::

     _DecimalEscape_
     `b`
     _CharacterEscape_
     _CharacterClassEscape_

O _ClassEscape_ especial `\b` produz um conjunto de caracteres que casa a unidade de código U+0008 (backspace). Fora de _CharacterClass_, é a _Asserção_ de limite de palavra.

O uso de `\B` e o uso de qualquer retroreferência (_DecimalEscape_ diferente de zero) dentro de uma _CharacterClass_ é um erro.

Os caracteres `-` e `]` podem precisar ser escapados em algumas situações para serem tratados como átomos. Outros caracteres que têm significado especial fora de _CharacterClass_, como `*` ou `?`, não precisam ser escapados.

| Esta seção está incompleta
Razão: sem exemplo

### Classes de caracteres baseadas em POSIX

Estas classes de caracteres são uma extensão da gramática ECMAScript e são equivalentes às classes de caracteres encontradas nas expressões regulares POSIX.

ClassAtomExClass(somente C++) ::

     `[:` _ClassName_ `:]`

Representa todos os caracteres que são membros da classe de caracteres nomeada _ClassName_. O nome é válido apenas se [std::regex_traits::lookup_classname](<#/doc/regex/regex_traits/lookup_classname>) retornar um valor diferente de zero para este nome. Conforme descrito em [std::regex_traits::lookup_classname](<#/doc/regex/regex_traits/lookup_classname>), os seguintes nomes são garantidos como reconhecidos: `alnum, alpha, blank, cntrl, digit, graph, lower, print, punct, space, upper, xdigit, d, s, w`. Nomes adicionais podem ser fornecidos por locales do sistema (como `jdigit` ou `jkanji` em japonês) ou implementados como uma extensão definida pelo usuário.

ClassAtomCollatingElement(somente C++) ::

     `[.` _ClassName_ `.]`

Representa o elemento de ordenação nomeado, que pode representar um único caractere ou uma sequência de caracteres que se ordena como uma única unidade sob o locale imbuído, como `[.tilde.]` ou `[.ch.]` em tcheco. O nome é válido apenas se [std::regex_traits::lookup_collatename](<#/doc/regex/regex_traits/lookup_collatename>) não for uma string vazia.
Ao usar [std::regex_constants::collate](<#/doc/regex/syntax_option_type>), elementos de ordenação podem sempre ser usados como pontos finais de um range (por exemplo, `[[.dz.]-g]` em húngaro).

ClassAtomEquivalence(apenas C++) ::

     `[=` _ClassName_ `=]`

Representa todos os caracteres que são membros da mesma classe de equivalência que o elemento de ordenação nomeado, isto é, todos os caracteres cuja chave de ordenação primária é a mesma que a do elemento de ordenação _ClassName_. O nome é válido apenas se [std::regex_traits::lookup_collatename](<#/doc/regex/regex_traits/lookup_collatename>) para esse nome não for uma string vazia e se o valor retornado por [std::regex_traits::transform_primary](<#/doc/regex/regex_traits/transform_primary>) para o resultado da chamada para [std::regex_traits::lookup_collatename](<#/doc/regex/regex_traits/lookup_collatename>) não for uma string vazia.

Uma chave de ordenação primária é aquela que ignora maiúsculas/minúsculas, acentuação ou adaptações específicas de locale; assim, por exemplo, `[[=a=]]` corresponde a qualquer um dos caracteres: `a, À, Á, Â, Ã, Ä, Å, A, à, á, â, ã, ä and å. `

ClassName(apenas C++) ::

     ClassNameCharacter
     ClassNameCharacter ClassName

ClassNameCharacter(apenas C++) ::

     _SourceCharacter_ mas não um de `. = :`
| Esta seção está incompleta
Razão: nenhum exemplo