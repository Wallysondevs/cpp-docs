# bloco try

Uma [exceção](<#/doc/language/exceptions>) lançada em um bloco try pode ser tratada por um handler associado.

### Sintaxe

---
`try` compound-statement handler-seq | (1) |
---|---|---
`try` ctor-initializer ﻿(optional) compound-statement handler-seq | (2) |

1) Um [bloco try comum](<#/doc/language/try>).

2) Um [bloco try de função](<#/doc/language/try>). compound-statement deve ser o componente de instrução composta de um corpo de função.

- **compound-statement** — uma [instrução composta](<#/doc/language/statements>)
- **handler-seq** — uma sequência não vazia de [handlers](<#/doc/language/catch>)
- **ctor-initializer** — lista de inicializadores de membro (apenas para [construtores](<#/doc/language/initializer_list>))

### Bloco try comum

Um bloco try comum é uma [instrução](<#/doc/language/statements>).

Se uma exceção for lançada de seu compound-statement, a exceção será comparada com os [handlers](<#/doc/language/catch>) em sua handler-seq ﻿:
```cpp
    void f()
    {
        throw 1;     // NÃO tratado pelo handler abaixo
        try
        {
            throw 2; // tratado pelo handler associado
        }
        catch (...)
        {
            // trata a exceção 2
        }
        throw 3;     // NÃO tratado pelo handler acima
    }
```

### Bloco try de função

Um bloco try de função é um tipo especial de [corpo de função](<#/doc/language/function>).

Se uma exceção for lançada de seu compound-statement ou ctor-initializer (se houver), a exceção será comparada com os [handlers](<#/doc/language/catch>) em sua handler-seq ﻿:
```cpp
    int f(bool cond)
    {
        if (cond)
            throw 1;
        return 0;
    }
    
    struct X
    {
        int mem;
    
        X() try : mem(f(true)) {}
        catch (...)
        {
            // trata a exceção 1
        }
    
        X(int) try
        {
            throw 2;
        }
        catch (...)
        {
            // trata a exceção 2
        }
    };
```

Exceções lançadas em destrutores de objetos com [duração de armazenamento](<#/doc/language/storage_duration>) estática ou em construtores de objetos associados a [variáveis não-bloco](<#/doc/language/scope>) com duração de armazenamento estática não são capturadas por um bloco try de função na [função main](<#/doc/language/main_function>).

Exceções lançadas em destrutores de objetos com duração de armazenamento de thread ou em construtores de objetos associados a variáveis não-bloco com duração de armazenamento de thread não são capturadas por um bloco try de função na função inicial da thread. | (desde C++11)

Sair do final do compound-statement de um [handler](<#/doc/language/catch>) de um bloco try de função é equivalente a sair do final do compound-statement desse bloco try de função, a menos que a função seja um construtor ou destrutor (veja abaixo).

#### Bloco try de construtor e destrutor

Para uma classe `C`, se o corpo de função de sua definição de construtor ou destrutor for um bloco try de função, e uma exceção for lançada durante a inicialização ou destruição, respectivamente, dos subobjetos de `C`, a exceção também será comparada com os [handlers](<#/doc/language/catch>) na handler-seq ﻿ do bloco try de função:
```cpp
    int f(bool cond = true)
    {
        if (cond)
            throw 1;
        return 0;
    }
    
    struct X
    {
        int mem = f();
    
        ~X()
        {
            throw 2;
        }
    };
    
    struct Y
    {
        X mem;
    
        Y() try {}
        catch (...)
        {
            // trata a exceção 1
        }
    
        ~Y() try {}
        catch (...)
        {
            // trata a exceção 2
        }
    };
```

Referenciar qualquer membro não estático ou classe base de um objeto no handler para um bloco try de função de um construtor ou destrutor para esse objeto resulta em comportamento indefinido.

Se uma [instrução return](<#/doc/language/return>) aparecer em um handler do bloco try de função de um construtor, o programa é malformado.

A [exceção atualmente tratada](<#/doc/language/catch>) é relançada se o controle atingir o final de um handler do bloco try de função de um construtor ou destrutor.

### Fluxo de controle

O compound-statement de um bloco try é uma [instrução com fluxo de controle limitado](<#/doc/language/statements>):
```cpp
    void f()
    {
        goto label;     // erro
        try
        {
            goto label; // OK
            label: ;
        }
        catch (...)
        {
            goto label; // erro
        }
    }
```

Uma [instrução de salto](<#/doc/language/statements>) ([`goto`](<#/doc/language/goto>), [`break`](<#/doc/language/break>), [`return`](<#/doc/language/return>), [`continue`](<#/doc/language/continue>)) pode ser usada para transferir o controle para fora de um bloco try (incluindo seus handlers). Quando isso acontece, cada variável declarada no bloco try será destruída no contexto que contém diretamente sua declaração:
```cpp
    try
    {
        T1 t1;
        try
        {
            T2 t2;
            goto label; // destrói t2 primeiro, depois t1
        }
        catch(...)
        {
            // executado se uma exceção for lançada ao destruir t2
        }
    }
    catch(...)
    {
        // executado se uma exceção for lançada ao destruir t1
    }
    label: ;
```

### Palavras-chave

[`try`](<#/doc/keyword/try>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 98](<https://cplusplus.github.io/CWG/issues/98.html>) | C++98 | uma instrução switch pode transferir o controle
para o compound-statement de um bloco try | proibido
[CWG 1167](<https://cplusplus.github.io/CWG/issues/1167.html>) | C++98 | não era especificado se um bloco try de função em um destrutor
capturaria exceções de um destrutor base ou membro | tais exceções
são capturadas

### Veja também

  * [Lançando exceções](<#/doc/language/throw>)
  * [Tratando exceções](<#/doc/language/catch>)
