# Controle de comportamento definido pela implementação

O comportamento definido pela implementação é controlado pela diretiva #pragma.

### Sintaxe

---
`#pragma` pragma-params | (1) |
---|---|---
`_Pragma(` string-literal `)` | (2) | (desde C++11)
---

1) Comporta-se de maneira definida pela implementação.

2) Remove o prefixo `L` (se houver), as aspas externas e os espaços em branco iniciais/finais do string-literal, substitui cada `\"` por `"` e cada `\\\` por `\`, então tokeniza o resultado (como na [fase de tradução 3](<#/doc/language/translation_phases>)), e então usa o resultado como se fosse a entrada para #pragma em (1).

### Explicação

A diretiva pragma controla o comportamento específico da implementação do compilador, como desabilitar avisos do compilador ou alterar requisitos de alinhamento. Qualquer pragma que não for reconhecido é ignorado.

### Pragmas não padronizados

O padrão da linguagem C++ ISO não exige que os compiladores suportem quaisquer pragmas. No entanto, vários pragmas não padronizados são suportados por múltiplas implementações:

#### #pragma STDC

O padrão da linguagem C ISO exige que os compiladores C suportem os três pragmas a seguir, e alguns fornecedores de compiladores C++ os suportam, em graus variados, em seus frontends C++:

---
`#pragma STDC FENV_ACCESS` arg | (1) |
---|---|---
`#pragma STDC FP_CONTRACT` arg | (2) |
`#pragma STDC CX_LIMITED_RANGE` arg | (3) |
---

onde arg é **ON**, **OFF**, ou **DEFAULT**.

1) Se definido como **ON**, informa ao compilador que o programa acessará ou modificará o [ambiente de ponto flutuante](<#/doc/numeric/fenv>), o que significa que otimizações que poderiam subverter testes de flag e mudanças de modo (por exemplo, eliminação de subexpressões comuns globais, movimentação de código e folding de constantes) são proibidas. O valor padrão é definido pela implementação, geralmente **OFF**.

2) Permite o _contrato_ de expressões de ponto flutuante, ou seja, otimizações que omitem erros de arredondamento e exceções de ponto flutuante que seriam observadas se a expressão fosse avaliada exatamente como escrita. Por exemplo, permite a implementação de (x * y) + z com uma única instrução CPU de multiplicação-adição fundida. O valor padrão é definido pela implementação, geralmente **ON**.

3) Informa ao compilador que a multiplicação, divisão e valor absoluto de números complexos podem usar fórmulas matemáticas simplificadas (x+iy)×(u+iv) = (xu-yv)+i(yu+xv), (x+iy)/(u+iv) = [(xu+yv)+i(yu-xv)]/(u2
+v2
), e |x+iy| = √x2
+y2
, apesar da possibilidade de overflow intermediário. Em outras palavras, o programador garante que o range dos valores que serão passados para essas funções é limitado. O valor padrão é **OFF**.

O comportamento do programa é indefinido se qualquer um dos três pragmas acima aparecer em qualquer contexto que não seja fora de todas as declarações externas ou precedendo todas as declarações e instruções explícitas dentro de uma instrução composta.

Nota: compiladores que não suportam esses pragmas podem fornecer opções equivalentes em tempo de compilação, como `-fcx-limited-range` e `-ffp-contract` do gcc.

#### #pragma once

#pragma once é um pragma não padronizado que é suportado pela [grande maioria dos compiladores modernos](<https://en.wikipedia.org/wiki/Pragma_once#Portability> "enwiki:Pragma once"). Se ele aparecer em um arquivo header, indica que deve ser analisado apenas uma vez, mesmo que seja incluído (direta ou indiretamente) várias vezes no mesmo arquivo fonte.

A abordagem padrão para prevenir múltiplas inclusões do mesmo header é usando [include guards](<https://en.wikipedia.org/wiki/Include_guard> "enwiki:Include guard"):
```cpp
    #ifndef LIBRARY_FILENAME_H
    #define LIBRARY_FILENAME_H
    // contents of the header
    #endif /* LIBRARY_FILENAME_H */
```

De modo que todas as inclusões do header, exceto a primeira, em qualquer unidade de tradução sejam excluídas da compilação. Todos os compiladores modernos registram o fato de que um arquivo header usa um include guard e não reanalisam o arquivo se ele for encontrado novamente, desde que o guard ainda esteja definido (veja, por exemplo, [gcc](<https://gcc.gnu.org/onlinedocs/cpp/Once-Only-Headers.html>)).

Com #pragma once, o mesmo header aparece como
```cpp
    #pragma once
    // contents of the header
```

Ao contrário dos header guards, este pragma torna impossível usar erroneamente o mesmo nome de macro em mais de um arquivo. Por outro lado, como com #pragma once os arquivos são excluídos com base em sua identidade no nível do sistema de arquivos, isso não pode proteger contra a inclusão de um header duas vezes se ele existir em mais de um local em um projeto.

#### #pragma pack

Esta família de pragmas controla o alinhamento máximo para membros de classes e unions definidos subsequentemente.

---
`#pragma pack( arg) ` | (1) |
---|---|---
`#pragma pack()` | (2) |
`#pragma pack(push)` | (3) |
`#pragma pack(push, arg) ` | (4) |
`#pragma pack(pop)` | (5) |
---

onde arg é uma pequena potência de dois e especifica o novo alinhamento em bytes.

1) Define o alinhamento atual para o valor arg.

2) Define o alinhamento atual para o valor padrão (especificado por uma opção de linha de comando).

3) Empilha o valor do alinhamento atual em uma stack interna.

4) Empilha o valor do alinhamento atual na stack interna e então define o alinhamento atual para o valor arg.

5) Desempilha a entrada superior da stack interna e então define (restaura) o alinhamento atual para esse valor.

#pragma pack pode diminuir o alinhamento de uma classe, no entanto, não pode tornar uma classe overaligned.

Veja também detalhes específicos para [GCC](<https://gcc.gnu.org/onlinedocs/gcc/Structure-Layout-Pragmas.html>) e [MSVC](<https://docs.microsoft.com/en-us/cpp/preprocessor/pack>).

| Esta seção está incompleta
Razão: Explicar os efeitos desses pragmas em membros de dados e também os prós e contras de usá-los.
Fontes para referência:

  * [Stack Overflow](<https://stackoverflow.com/questions/3318410/pragma-pack-effect>)

| Esta seção está incompleta
Razão: nenhum exemplo

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 15.9 Diretiva Pragma [cpp.pragma]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 15.9 Diretiva Pragma [cpp.pragma]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 19.6 Diretiva Pragma [cpp.pragma]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 16.6 Diretiva Pragma [cpp.pragma]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 16.6 Diretiva Pragma [cpp.pragma]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 16.6 Diretiva Pragma [cpp.pragma]

### Veja também

[Documentação C](<#/>) para controle de comportamento definido pela implementação
---

### Links externos

1. | [Pragmas C++ no Visual Studio](<https://docs.microsoft.com/en-us/cpp/preprocessor/pragma-directives-and-the-pragma-keyword>)
---|---
2. | [Pragmas](<https://gcc.gnu.org/onlinedocs/gcc/Pragmas.html>) aceitos pelo GCC
3. | [Descrições de pragma individuais](<https://www.ibm.com/support/knowledgecenter/en/SSGH3R_16.1.0/com.ibm.xlcpp161.aix.doc/compiler_ref/pragma_descriptions.html>) e [Pragmas padrão](<https://www.ibm.com/support/knowledgecenter/en/SSGH3R_16.1.0/com.ibm.xlcpp161.aix.doc/language_ref/std_pragmas.html>) no IBM AIX XL C 16.1
4. | [Apêndice B. Pragmas](<https://download.oracle.com/docs/cd/E19422-01/819-3690/Pragmas_App.html#73499>) no Guia do Usuário C++ do Sun Studio 11
5. | [Pragmas do compilador Intel C++](<https://software.intel.com/content/www/us/en/develop/documentation/cpp-compiler-developer-guide-and-reference/top/compiler-reference/pragmas.html>)
6. | [Notas de lançamento (inclui pragmas)](<https://h20565.www2.hpe.com/hpsc/doc/public/display?sp4ts.oid=4268164&docLocale=en_US&docId=emr_na-c02653979>) para HP aCC A.06.25