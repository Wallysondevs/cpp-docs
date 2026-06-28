# Tratamento de exceções

Uma [exceção](<#/doc/language/exceptions>) pode ser tratada por um handler.

### Handler

---
`catch` `(` attr ﻿(optional) type-specifier-seq declarator `)` compound-statement | (1) |
---|---|---
`catch` `(` attr ﻿(optional) type-specifier-seq abstract-declarator ﻿(optional) `)` compound-statement | (2) |
`catch` `(` `...` `)` compound-statement | (3) |

1) Um handler com um parâmetro nomeado.
2) Um handler com um parâmetro sem nome.
3) Um handler que corresponde a todos os tipos de exceções.

- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>), aplica-se ao parâmetro
- **type-specifier-seq** — parte de uma declaração de parâmetro formal, o mesmo que em uma [lista de parâmetros](<#/doc/language/function>) de função
- **declarator** — parte de uma declaração de parâmetro, o mesmo que em uma [lista de parâmetros](<#/doc/language/function>) de função
- **abstract-declarator** — parte de uma declaração de parâmetro sem nome, o mesmo que em uma [lista de parâmetros](<#/doc/language/function>) de função
- **compound-statement** — uma [instrução composta](<#/doc/language/statements>)

A declaração do parâmetro em um handler descreve o(s) tipo(s) de exceções que podem fazer com que esse handler seja acionado.

Se o parâmetro for declarado para ter um dos seguintes tipos, o programa é malformado:

  * um [tipo incompleto](<#/doc/language/type-id>)
  * um [tipo de classe abstrata](<#/doc/language/abstract_class>)
  * um tipo [rvalue reference](<#/doc/language/reference>) (desde C++11)
  * um ponteiro para um tipo incompleto diferente de `void` (possivelmente cv-qualificado)
  * uma lvalue reference para um tipo incompleto

Se o parâmetro for declarado para ter o tipo “array de `T`” ou tipo de função `T`, o tipo é ajustado para “ponteiro para `T`”.

Um handler com tipo de parâmetro `T` pode ser abreviado como “um handler do tipo `T`”.

### Correspondência de exceções

Cada bloco `try` associa-se a um número de handlers; esses handlers formam uma sequência de handlers. Quando uma exceção é lançada de um bloco `try`, os handlers na sequência são tentados na ordem de aparição para corresponder à exceção.

Um handler corresponde a um [objeto de exceção](<#/doc/language/throw>) do tipo `E` se qualquer uma das seguintes condições for satisfeita:

  * O handler é do tipo “`T` possivelmente cv-qualificado” ou “lvalue reference para `T` possivelmente cv-qualificado”, e qualquer uma das seguintes condições é satisfeita:
    * `E` e `T` são do mesmo tipo (ignorando os cv-qualificadores de nível superior).
    * `T` é uma classe base pública não ambígua de `E`.
  * O handler é do tipo “`T` possivelmente cv-qualificado” ou `const T&` onde `T` é um tipo ponteiro ou ponteiro para membro, e qualquer uma das seguintes condições é satisfeita:
    * `E` é um tipo ponteiro ou ponteiro para membro que pode ser convertido para `T` por pelo menos uma das seguintes conversões:
      * Uma [conversão de ponteiro padrão](<#/doc/language/implicit_cast>) que não envolve conversões para ponteiros para classes privadas, protegidas ou ambíguas.
      * Uma [conversão de ponteiro de função](<#/doc/language/implicit_cast>). (desde C++17)
      * Uma [conversão de qualificação](<#/doc/language/implicit_cast>).
    * `E` é [std::nullptr_t](<#/doc/types/nullptr_t>). (desde C++11)

O handler `catch (...)` corresponde a exceções de qualquer tipo. Se presente, ele só pode ser o último handler em uma sequência de handlers. Este handler pode ser usado para garantir que nenhuma exceção não capturada possa escapar de uma função que oferece [garantia de exceção nothrow](<#/doc/language/exceptions>).
```cpp
    try
    {
        f();
    }
    catch (const std::overflow_error& e)
    {} // isso é executado se f() lançar std::overflow_error (regra de mesmo tipo)
    catch (const std::runtime_error& e)
    {} // isso é executado se f() lançar std::underflow_error (regra de classe base)
    catch (const std::exception& e)
    {} // isso é executado se f() lançar std::logic_error (regra de classe base)
    catch (...)
    {} // isso é executado se f() lançar std::string ou int ou qualquer outro tipo não relacionado
```

Se nenhuma correspondência for encontrada entre os handlers para um bloco `try`, a busca por um handler correspondente continua em um bloco `try` dinamicamente envolvente da mesma thread (desde C++11).

Se nenhum handler correspondente for encontrado, [std::terminate](<#/doc/error/terminate>) é invocado; se a pilha é ou não [desenrolada](<#/doc/language/throw>) antes desta invocação de [std::terminate](<#/doc/error/terminate>) é definido pela implementação.

### Tratamento de exceções

Quando uma exceção é lançada, o controle é transferido para o handler mais próximo com um tipo correspondente; “mais próximo” significa o handler para o qual a instrução composta ou a lista de inicializadores de membro (se presente) seguindo a palavra-chave `try` foi mais recentemente inserida pela thread de controle e ainda não foi saída.

#### Inicializando o parâmetro do handler

O parâmetro declarado na lista de parâmetros (se houver), do tipo “`T` possivelmente cv-qualificado” ou “lvalue reference para `T` possivelmente cv-qualificado”, é inicializado a partir do [objeto de exceção](<#/doc/language/throw>), do tipo `E`, da seguinte forma:

  * Se `T` for uma classe base de `E`, o parâmetro é [copy-initialized](<#/doc/language/copy_initialization>) a partir de um lvalue do tipo `T` que designa o subobjeto da classe base correspondente do objeto de exceção.
  * Caso contrário, o parâmetro é copy-initialized a partir de um lvalue do tipo `E` que designa o objeto de exceção.

O tempo de vida do parâmetro termina quando o handler é encerrado, após a destruição de quaisquer objetos com [duração de armazenamento](<#/doc/language/storage_duration>) automática inicializados dentro do handler.

Quando o parâmetro é declarado como um objeto, quaisquer alterações a esse objeto não afetarão o objeto de exceção.

Quando o parâmetro é declarado como uma referência a um objeto, quaisquer alterações ao objeto referenciado são alterações ao objeto de exceção e terão efeito caso esse objeto seja relançado.

#### Ativando o handler

Um handler é considerado _ativo_ quando a inicialização do parâmetro (se houver) do handler é concluída.

Além disso, um handler implícito é considerado ativo quando [std::terminate](<#/doc/error/terminate>) é acionado devido a um `throw`.

Um handler não é mais considerado ativo quando o handler é encerrado.

A exceção com o handler mais recentemente ativado que ainda está ativo é chamada de _exceção atualmente tratada_. Tal exceção pode ser [relançada](<#/doc/language/throw>).

### Fluxo de controle

A instrução composta de um handler é uma [instrução com fluxo de controle limitado](<#/doc/language/statements>):
```cpp
    void f()
    {
        goto label;     // erro
        try
        {
            goto label; // erro
        }
        catch (...)
        {
            goto label: // OK
            label: ;
        }
    }
```

### Notas

[Desenrolamento da pilha](<#/doc/language/throw>) ocorre enquanto o controle está sendo transferido para um handler. Quando um handler se torna ativo, o desenrolamento da pilha já está completo.

A exceção lançada pela expressão `throw 0` não corresponde a um handler de tipo ponteiro ou ponteiro para membro.

  * `throw nullptr` pode ser usado em vez disso para lançar um ponteiro nulo que corresponde a tais handlers. (desde C++11)

[Objetos de exceção](<#/doc/language/throw>) nunca podem ter tipos array ou função, portanto, um handler de referência para tipo array ou função nunca corresponde a nenhum objeto de exceção.

É possível escrever handlers que nunca podem ser executados, por exemplo, colocando um handler para uma classe derivada final após um handler para uma classe base pública não ambígua correspondente:
```cpp
    try
    {
        f();
    }
    catch (const std::exception& e)
    {} // será executado se f() lançar std::runtime_error
    catch (const std::runtime_error& e)
    {} // código morto!
```

Muitas implementações estendem excessivamente a resolução do [CWG issue 388](<https://cplusplus.github.io/CWG/issues/388.html>) para handlers de referência para tipos de ponteiro não-const:
```cpp
    int i;
    try
    {
        try
        {
            throw static_cast<float*>(nullptr);
        }
        catch (void*& pv)
        {
            pv = &i;
            throw;
        }
    }
    catch (const float* pf)
    {
        assert(pf == nullptr); // deveria passar, mas falha no MSVC e Clang
    }
```

### Palavras-chave

[`catch`](<#/doc/keyword/catch>)

### Exemplo

O exemplo a seguir demonstra vários casos de uso dos handlers:

Execute este código
```cpp
    #include <iostream>
    #include <vector>
     
    int main()
    {
        try
        {
            std::cout << "Lançando uma exceção inteira...\n";
            throw 42;
        }
        catch (int i)
        {
            std::cout << " a exceção inteira foi capturada, com valor: " << i << '\n';
        }
     
        try
        {
            std::cout << "Criando um vetor de tamanho 5... \n";
            std::vector<int> v(5);
            std::cout << "Acessando o 11º elemento do vetor...\n";
            std::cout << v.at(10); // vector::at() lança std::out_of_range
        }
        catch (const std::exception& e) // capturada por referência à base
        {
            std::cout << " uma exceção padrão foi capturada, com a mensagem: '"
                      << e.what() << "'\n";
        }
    }
```

Saída possível:
```
    Lançando uma exceção inteira...
     a exceção inteira foi capturada, com valor: 42
    Criando um vetor de tamanho 5...
    Acessando o 11º elemento do vetor...
     uma exceção padrão foi capturada, com a mensagem: 'out_of_range'
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 98](<https://cplusplus.github.io/CWG/issues/98.html>) | C++98 | uma instrução `switch` pode transferir o controle para um handler | proibido
[CWG 210](<https://cplusplus.github.io/CWG/issues/210.html>) | C++98 | expressões `throw` eram comparadas com os handlers | objetos de exceção são comparados com os handlers
[CWG 388](<https://cplusplus.github.io/CWG/issues/388.html>) | C++98 | uma exceção de tipo ponteiro ou ponteiro para membro não podia ser correspondida por uma referência `const` a um tipo diferente | tornada correspondente quando conversível
[CWG 1166](<https://cplusplus.github.io/CWG/issues/1166.html>) | C++98 | o comportamento era não especificado quando um handler cujo tipo é uma referência a um tipo de classe abstrata era correspondido | tipos de classe abstrata não são permitidos para handlers
[CWG 1769](<https://cplusplus.github.io/CWG/issues/1769.html>) | C++98 | quando o tipo do handler é uma base do tipo do objeto de exceção, um construtor de conversão poderia ser usado para a inicialização do parâmetro do handler | o parâmetro é copy-initialized a partir do subobjeto da classe base correspondente do objeto de exceção
[CWG 2093](<https://cplusplus.github.io/CWG/issues/2093.html>) | C++98 | um objeto de exceção de tipo ponteiro para objeto não podia corresponder a um handler de tipo ponteiro para objeto através de conversão de qualificação | permitido

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):
    * 14.4 Tratamento de uma exceção [except.handle]
  * Padrão C++20 (ISO/IEC 14882:2020):
    * 14.4 Tratamento de uma exceção [except.handle]
  * Padrão C++17 (ISO/IEC 14882:2017):
    * 18.3 Tratamento de uma exceção [except.handle]
  * Padrão C++14 (ISO/IEC 14882:2014):
    * 15.3 Tratamento de uma exceção [except.handle]
  * Padrão C++11 (ISO/IEC 14882:2011):
    * 15.3 Tratamento de uma exceção [except.handle]
  * Padrão C++03 (ISO/IEC 14882:2003):
    * 15.3 Tratamento de uma exceção [except.handle]
  * Padrão C++98 (ISO/IEC 14882:1998):
    * 15.3 Tratamento de uma exceção [except.handle]

### Ver também

  * [bloco try](<#/doc/language/try>)
  * [Lançando exceções](<#/doc/language/throw>)
  * [Tratamento de exceções](<#/doc/error>)
