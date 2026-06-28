# operator new, operator new[]

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
Funções de alocação substituíveis
void* operator new ( std::size_t count );
void* operator new;
void* operator new ( std::size_t count, std::align_val_t al );
void* operator new;
Funções de alocação não-lançadoras de exceção substituíveis
void* operator new ( std::size_t count, const std::nothrow_t& tag );
void* operator new;
void* operator new ( std::size_t count, std::align_val_t al,
const std::nothrow_t& tag ) noexcept;
void* operator new[]( std::size_t count, std::align_val_t al,
const std::nothrow_t& tag ) noexcept;
Funções de alocação de posicionamento não-alocadoras
void* operator new ( std::size_t count, void* ptr );
(constexpr desde C++26)
void* operator new;
(constexpr desde C++26)
Funções de alocação de posicionamento definidas pelo usuário
void* operator new ( std::size_t count, /* args... */ );
void* operator new;
void* operator new ( std::size_t count,
std::align_val_t al, /* args... */ );
void* operator new[]( std::size_t count,
std::align_val_t al, /* args... */ );
Funções de alocação específicas da classe
void* T::operator new ( std::size_t count );
void* T::operator new;
void* T::operator new ( std::size_t count, std::align_val_t al );
void* T::operator new;
Funções de alocação de posicionamento específicas da classe
void* T::operator new ( std::size_t count, /* args... */ );
void* T::operator new;
void* T::operator new ( std::size_t count,
std::align_val_t al, /* args... */ );
void* T::operator new[]( std::size_t count,
std::align_val_t al, /* args... */ );
```

Tenta alocar o número de bytes solicitado, e a requisição de alocação pode falhar (mesmo que o número de bytes solicitado seja zero). Essas funções de alocação são chamadas por [expressões new](<#/doc/language/new>) para alocar memória na qual o novo objeto seria então inicializado. Elas também podem ser chamadas usando a sintaxe de chamada de função regular.

1) Chamada por new para alocar o armazenamento necessário para um único objeto.

A implementação da standard library aloca count bytes do free store.

Em caso de falha, a implementação da standard library chama o ponteiro de função retornado por [std::get_new_handler](<#/doc/memory/new/get_new_handler>) e repete as tentativas de alocação até que o new handler não retorne ou se torne um ponteiro nulo, momento em que lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

Esta função é obrigada a retornar um ponteiro adequadamente alinhado para apontar para um objeto do tamanho solicitado.

2) Chamada por new[] para alocar todo o armazenamento necessário para um array (incluindo possível overhead da expressão new).

A implementação da standard library chama a versão (1).

3) Chamada por new para alocar o armazenamento necessário para um único objeto cujo requisito de alinhamento excede __STDCPP_DEFAULT_NEW_ALIGNMENT__.

4) Chamada por new[] para alocar todo o armazenamento necessário para um array de objetos cujo requisito de alinhamento excede __STDCPP_DEFAULT_NEW_ALIGNMENT__.

5) Chamada pelo new não-lançador de exceção.

A implementação da standard library chama a versão (1) e retorna um ponteiro nulo em caso de falha, em vez de propagar a exceção.

6) Chamada pelo new[] não-lançador de exceção.

A implementação da standard library chama a versão (2) e retorna um ponteiro nulo em caso de falha, em vez de propagar a exceção.

7) Chamada pelo new não-lançador de exceção quando o requisito de alinhamento do objeto excede __STDCPP_DEFAULT_NEW_ALIGNMENT__.

A implementação da standard library chama a versão (3) e retorna um ponteiro nulo em caso de falha, em vez de propagar a exceção.

8) Chamada pelo new[] não-lançador de exceção quando o requisito de alinhamento dos elementos do array excede __STDCPP_DEFAULT_NEW_ALIGNMENT__.

A implementação da standard library chama a versão (4) e retorna um ponteiro nulo em caso de falha, em vez de propagar a exceção.

9) Chamada pelo [placement new](<#/doc/language/new>) padrão.

A implementação da standard library não realiza nenhuma ação e retorna ptr sem modificação.

Se esta função for chamada através de placement new e ptr for um ponteiro nulo, o comportamento é indefinido.

10) Chamada pelo placement new[] padrão.

A implementação da standard library não realiza nenhuma ação e retorna ptr sem modificação.

Se esta função for chamada através de placement new[] e ptr for um ponteiro nulo, o comportamento é indefinido.

11) Se definida, chamada pelo placement new customizado com a assinatura correspondente.

Se uma versão específica da classe (19) for definida, ela é chamada em preferência a (11).

Se nem (11) nem (19) for fornecida pelo usuário, o placement new é malformado.

12) Se definida, chamada pelo placement new[] customizado com a assinatura correspondente.

Se uma versão específica da classe (20) for definida, ela é chamada em preferência a (12).

Se nem (12) nem (20) for fornecida pelo usuário, o placement new[] é malformado.

13) Se definida, chamada pelo placement new customizado com a assinatura correspondente se o requisito de alinhamento do objeto exceder __STDCPP_DEFAULT_NEW_ALIGNMENT__.

Se uma versão específica da classe for definida ((15) ou (17)), ela é chamada em vez disso.

Se nem a forma de placement específica da classe nem a global com reconhecimento de alinhamento (esta) for fornecida, a forma de placement sem reconhecimento de alinhamento (11) é procurada em vez disso.

14) Se definida, chamada pelo placement new[] customizado com a assinatura correspondente se o requisito de alinhamento do elemento exceder __STDCPP_DEFAULT_NEW_ALIGNMENT__.

Se uma versão específica da classe for definida ((16) ou (18)), ela é chamada em vez disso.

Se nem a forma de placement específica da classe nem a global com reconhecimento de alinhamento (esta) for fornecida, a forma de placement sem reconhecimento de alinhamento (12) é procurada em vez disso.

15) Se definida, chamada por new se estiver alocando um objeto do tipo `T`.

16) Se definida, chamada por new[] se estiver alocando um array de objetos do tipo `T`.

17) Se definida, chamada por new se estiver alocando um objeto do tipo `T` se seu requisito de alinhamento exceder __STDCPP_DEFAULT_NEW_ALIGNMENT__.

Se esta sobrecarga não for fornecida, mas a forma de membro sem reconhecimento de alinhamento (15) for, a sobrecarga de membro sem reconhecimento de alinhamento é chamada em vez disso.

18) Se definida, chamada por new[] se estiver alocando um array de objetos do tipo `T` se seu requisito de alinhamento exceder __STDCPP_DEFAULT_NEW_ALIGNMENT__.

Se esta sobrecarga não for fornecida, mas a forma de membro sem reconhecimento de alinhamento (16) for, a sobrecarga de membro sem reconhecimento de alinhamento é chamada em vez disso.

19) Se definida, chamada pelo placement new customizado com a assinatura correspondente se estiver alocando um objeto do tipo `T`.

20) Se definida, chamada pelo placement new[] customizado com a assinatura correspondente se estiver alocando um array de objetos do tipo `T`.

21) Se definida, chamada pelo placement new customizado com a assinatura correspondente se estiver alocando um objeto do tipo `T` se seu requisito de alinhamento exceder __STDCPP_DEFAULT_NEW_ALIGNMENT__.

Se esta sobrecarga não for fornecida, mas a forma de membro sem reconhecimento de alinhamento (19) for, a sobrecarga de membro sem reconhecimento de alinhamento é chamada em vez disso.

22) Se definida, chamada pelo placement new[] customizado com a assinatura correspondente se estiver alocando um array de objetos do tipo `T` se seu requisito de alinhamento exceder __STDCPP_DEFAULT_NEW_ALIGNMENT__.

Se esta sobrecarga não for fornecida, mas a forma de membro sem reconhecimento de alinhamento (20) for, a sobrecarga de membro sem reconhecimento de alinhamento é chamada em vez disso.

### Parâmetros

- **count** — número de bytes a alocar
- **ptr** — ponteiro para uma área de memória para inicializar o objeto
- **tag** — tag de desambiguação usada para selecionar sobrecargas não-lançadoras de exceção
- **al** — alinhamento a ser usado, valor inválido leva a comportamento indefinido

### Valor de retorno

1-4) Se a alocação for bem-sucedida, um ponteiro não nulo p0 que aponta para memória adequadamente alinhada de tamanho pelo menos size e é diferente de qualquer valor p1 retornado anteriormente, a menos que esse valor p1 tenha sido subsequentemente passado para uma [função de desalocação](<#/doc/memory/new/operator_delete>) substituível; se a alocação falhar, não retorna (uma exceção é lançada, veja abaixo).

5-8) O mesmo que ([1-4](<#/doc/memory/new/operator_new>)), mas retorna um ponteiro nulo se a alocação falhar.

9,10) ptr

11-22) O mesmo que ([1-4](<#/doc/memory/new/operator_new>)) se a função não retornar em caso de falha na alocação, caso contrário, o mesmo que ([5-8](<#/doc/memory/new/operator_new>)).

### Exceções

1-4) Lança uma exceção de um tipo que corresponderia a um handler do tipo [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha na alocação de memória.

11-22) O mesmo que ([1-4](<#/doc/memory/new/operator_new>)) se a função não retornar em caso de falha na alocação, caso contrário, o mesmo que ([5-8](<#/doc/memory/new/operator_new>)).

### Substituições globais

As versões ([1-4](<#/doc/memory/new/operator_new>)) são implicitamente declaradas em cada unidade de tradução, mesmo que o cabeçalho [`<new>`](<#/doc/header/new>) não seja incluído. As versões ([1-8](<#/doc/memory/new/operator_new>)) são _substituíveis_: uma função não-membro fornecida pelo usuário com a mesma assinatura definida em qualquer lugar do programa, em qualquer arquivo fonte, substitui a versão padrão. Sua declaração não precisa ser visível.

O programa é malformado, sem diagnóstico exigido, se mais de uma substituição for fornecida no programa para qualquer uma das funções de alocação substituíveis, ou se uma substituição for declarada com o [especificador inline](<#/doc/language/inline>). O programa é malformado se uma substituição for definida em um namespace diferente do namespace global, ou se for definida como uma função estática não-membro no escopo global.

As implementações da standard library das versões nothrow ([5-8](<#/doc/memory/new/operator_new>)) chamam diretamente as versões lançadoras de exceção correspondentes ([1-4](<#/doc/memory/new/operator_new>)). A implementação da standard library das versões de array lançadoras de exceção ([2,4](<#/doc/memory/new/operator_new>)) chama diretamente a versão correspondente de objeto único ([1,3](<#/doc/memory/new/operator_new>)). Assim, substituir as funções de alocação de objeto único lançadoras de exceção é suficiente para lidar com todas as alocações.

```cpp
Em implementações freestanding, é definido pela implementação se as versões padrão de (1-8) satisfazem os comportamentos exigidos acima. Recomenda-se que, se alguma dessas versões padrão atender aos requisitos de uma implementação hosted, todas elas o façam.  // (desde C++26)
```

Substituição global de `operator`s new/delete:

Run this code
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <new>
    
    // no inline, required by [replacement.functions]/3
    void* operator new(std::size_t sz)
    {
        std::printf("1) new(size_t), size = %zu\n", sz);
        if (sz == 0)
            ++sz; // avoid std::malloc(0) which may return nullptr on success
    
        if (void *ptr = std::malloc(sz))
            return ptr;
    
        throw std::bad_alloc{}; // required by [new.delete.single]/3
    }
    
    // no inline, required by [replacement.functions]/3
    void* operator new
    {
        std::printf("2) new, size = %zu\n", sz);
        if (sz == 0)
            ++sz; // avoid std::malloc(0) which may return nullptr on success
    
        if (void *ptr = std::malloc(sz))
            return ptr;
    
        throw std::bad_alloc{}; // required by [new.delete.single]/3
    }
    
    void operator delete(void* ptr) noexcept
    {
        std::puts("3) delete(void*)");
        std::free(ptr);
    }
    
    void operator delete(void* ptr, std::size_t size) noexcept
    {
        std::printf("4) delete(void*, size_t), size = %zu\n", size);
        std::free(ptr);
    }
    
    void operator delete noexcept
    {
        std::puts("5) delete");
        std::free(ptr);
    }
    
    void operator delete noexcept
    {
        std::printf("6) delete, size = %zu\n", size);
        std::free(ptr);
    }
    
    int main()
    {
        int* p1 = new int;
        delete p1;
    
        int* p2 = new int[10]; // guaranteed to call the replacement in C++11
        delete[] p2;
    }
```

Saída possível:
```
    // Compiled with GCC-5 in C++17 mode to obtain the following:
    1) op new(size_t), size = 4
    4) op delete(void*, size_t), size = 4
    2) op new, size = 40
    5) op delete
```

Sobrecargas de `operator new` e `operator new[]` com parâmetros adicionais definidos pelo usuário ("placement forms", versões ([11-14](<#/doc/memory/new/operator_new>))) podem ser declaradas no escopo global como de costume, e são chamadas pelas [placement forms](<#/doc/language/new>) correspondentes das expressões new.

As placement forms não-alocadoras da standard library de `operator new` ([9,10](<#/doc/memory/new/operator_new>)) não podem ser substituídas e só podem ser customizadas se a expressão placement new não usou a sintaxe ::new, fornecendo um placement new específico da classe ([19,20](<#/doc/memory/new/operator_new>)) com assinatura correspondente: void* T::operator new([std::size_t](<#/doc/types/size_t>), void*) ou void* T::operator new[]([std::size_t](<#/doc/types/size_t>), void*).

```cpp
A placement form void* operator new(std::size_t, std::size_t) não é permitida porque a assinatura correspondente da função de desalocação, void operator delete(void*, std::size_t), é uma função de desalocação usual (não de posicionamento).  // (desde C++14)
```

### Sobrecargas específicas da classe

Ambas as funções de alocação de objeto único e de array podem ser definidas como funções membro estáticas públicas de uma classe (versões ([15-18](<#/doc/memory/new/operator_new>))). Se definidas, essas funções de alocação são chamadas por expressões new para alocar memória para objetos únicos e arrays desta classe, a menos que a expressão new tenha usado a forma ::new que ignora a pesquisa de escopo de classe. A palavra-chave [`static`](<#/doc/keywords/static>) é opcional para essas funções: seja usada ou não, a função de alocação é uma função membro estática.

A expressão new procura o nome da função de alocação apropriada primeiramente no escopo da classe, e depois no escopo global. Note que, de acordo com as [regras de name lookup](<#/doc/language/lookup>), quaisquer funções de alocação declaradas no escopo da classe ocultam todas as funções de alocação globais para as expressões new que tentam alocar objetos desta classe.

Ao alocar objetos e arrays de objetos cujo alinhamento excede __STDCPP_DEFAULT_NEW_ALIGNMENT__, a resolução de sobrecarga é realizada duas vezes: primeiro, para assinaturas de função com reconhecimento de alinhamento, depois para assinaturas de função sem reconhecimento de alinhamento. Isso significa que se uma classe com alinhamento estendido tiver uma função de alocação específica da classe sem reconhecimento de alinhamento, é essa função que será chamada, e não a função de alocação global com reconhecimento de alinhamento. Isso é intencional: espera-se que o membro da classe saiba melhor como lidar com essa classe. | (desde C++17)
---|---
Ao alocar objetos e arrays de objetos cujo alinhamento não excede __STDCPP_DEFAULT_NEW_ALIGNMENT__, a resolução de sobrecarga é realizada duas vezes: primeiro, para assinaturas de função sem reconhecimento de alinhamento, depois para assinaturas de função com reconhecimento de alinhamento. | (desde C++20)

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    
    // class-specific allocation functions
    struct X
    {
        static void* operator new(std::size_t count)
        {
            std::cout << "custom new for size " << count << '\n';
            return ::operator new(count);
        }
    
        static void* operator new
        {
            std::cout << "custom new[] for size " << count << '\n';
            return ::operator new;
        }
    };
    
    int main()
    {
        X* p1 = new X;
        delete p1;
        X* p2 = new X[10];
        delete[] p2;
    }
```

Saída possível:
```
    custom new for size 1
    custom new[] for size 10
```

Sobrecargas de `operator new` e `operator new[]` com parâmetros adicionais definidos pelo usuário ("placement forms"), também podem ser definidas como membros de classe ([19-22](<#/doc/memory/new/operator_new>))). Quando a expressão placement new com a assinatura correspondente procura a função de alocação a ser chamada, ela começa no escopo da classe antes de examinar o escopo global, e se o placement new específico da classe for fornecido, ele é chamado.

Ao alocar objetos e arrays de objetos cujo alinhamento excede __STDCPP_DEFAULT_NEW_ALIGNMENT__, a resolução de sobrecarga para placement forms é realizada duas vezes, assim como para as formas regulares: primeiro, para assinaturas de função com reconhecimento de alinhamento, depois para assinaturas de função sem reconhecimento de alinhamento. | (desde C++17)
---|---
Ao alocar objetos e arrays de objetos cujo alinhamento não excede __STDCPP_DEFAULT_NEW_ALIGNMENT__, a resolução de sobrecarga para placement forms é realizada duas vezes, assim como para as formas regulares: primeiro, para assinaturas de função sem reconhecimento de alinhamento, depois para assinaturas de função com reconhecimento de alinhamento. | (desde C++20)

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <stdexcept>
    
    struct X
    {
        X() { throw std::runtime_error(""); }
    
        // custom placement new
        static void* operator new(std::size_t count, bool b)
        {
            std::cout << "custom placement new called, b = " << b << '\n';
            return ::operator new(count);
        }
    
        // custom placement delete
        static void operator delete(void* ptr, bool b)
        {
            std::cout << "custom placement delete called, b = " << b << '\n';
            ::operator delete(ptr);
        }
    };
    
    int main()
    {
        try
        {
            [[maybe_unused]] X* p1 = new (true) X;
        }
        catch (const std::exception&)
        {}
    }
```

Saída:
```
    custom placement new called, b = 1
    custom placement delete called, b = 1
```

Se `operator new` em nível de classe for uma função template, ela deve ter o tipo de retorno void*, o primeiro argumento [std::size_t](<#/doc/types/size_t>), e deve ter dois ou mais parâmetros. Em outras palavras, apenas as placement forms podem ser templates.

### Notas

Embora o placement new não-alocador ([9,10](<#/doc/memory/new/operator_new>)) não possa ser substituído, uma função com a mesma assinatura pode ser definida no escopo da classe conforme descrito acima. Além disso, sobrecargas globais que se parecem com placement new, mas que recebem um tipo de ponteiro não-void como segundo argumento, são permitidas, então o código que deseja garantir que o verdadeiro placement new seja chamado (por exemplo, [std::allocator::construct](<#/doc/memory/allocator/construct>)), deve usar ::new e também fazer um cast do ponteiro para void*.

Se o comportamento de uma função de desalocação não satisfizer as restrições padrão, o comportamento é indefinido.

As seguintes funções são exigidas para serem thread-safe:

*   As versões da library de `operator new` e [`operator delete`](<#/doc/memory/new/operator_delete>)
*   Versões de substituição do usuário de `operator new` e [`operator delete`](<#/doc/memory/new/operator_delete>) globais
*   [std::calloc](<#/doc/memory/c/calloc>), [std::malloc](<#/doc/memory/c/malloc>), [std::realloc](<#/doc/memory/c/realloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), [std::free](<#/doc/memory/c/free>)

Chamadas a essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [happens-before](<#/doc/atomic/memory_order>) a próxima alocação (se houver) nesta ordem. | (desde C++11)

É não especificado se as versões da library de `operator new` fazem quaisquer chamadas para [std::malloc](<#/doc/memory/c/malloc>) ou [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17).

Para carregar um arquivo grande, o mapeamento de arquivo via funções específicas do sistema operacional, por exemplo, [`mmap`](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/mmap.html>) em POSIX ou `CreateFileMapping`([`A`](<https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createfilemappinga>)/[`W`](<https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-createfilemappingw>)) juntamente com [`MapViewOfFile`](<https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-mapviewoffile>) no Windows, é preferível à alocação de um buffer para leitura de arquivo.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_freestanding_operator_new`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | suporte freestanding para operator new substituível[1](<#/doc/memory/new/operator_new>)
[`0`](<#/>) | (C++26) | sem suporte freestanding
[`__cpp_lib_constexpr_new`](<#/doc/feature_test>) | [`202406L`](<#/>) | (C++26) | placement new e new[] constexpr

1.  [↑](<#/doc/memory/new/operator_new>) Formalmente, esta macro se expande para 202306L se todas as versões padrão das funções de alocação globais substituíveis atenderem aos requisitos de uma implementação hosted.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 521](<https://cplusplus.github.io/CWG/issues/521.html>) | C++98 | qualquer classe derivada de [std::bad_alloc](<#/doc/memory/new/bad_alloc>) poderia ser lançada,
mesmo que a base [std::bad_alloc](<#/doc/memory/new/bad_alloc>) fosse ambígua ou inacessível | a exceção lançada deve corresponder
a um handler do tipo [std::bad_alloc](<#/doc/memory/new/bad_alloc>)
[LWG 9](<https://cplusplus.github.io/LWG/issue9>) | C++98 | múltiplas chamadas para alocar zero
bytes poderiam resultar no mesmo ponteiro | somente permitido se todos esses ponteiros previamente
resultantes tiverem sido
passados para funções de desalocação
[LWG 206](<https://cplusplus.github.io/LWG/issue206>) | C++98 | substituir as funções de alocação substituíveis não
afetava os comportamentos padrão das funções de alocação
não-lançadoras de exceção substituíveis correspondentes | os comportamentos padrão
mudam de acordo
[LWG 404](<https://cplusplus.github.io/LWG/issue404>) | C++98 | substituições das funções de alocação substituíveis
poderiam ser declaradas inline | proibido, nenhum diagnóstico exigido

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   17.7 Gerenciamento de memória dinâmica [support.dynamic]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   17.6 Gerenciamento de memória dinâmica [support.dynamic]

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   21.6 Gerenciamento de memória dinâmica [support.dynamic]

*   Padrão C++14 (ISO/IEC 14882:2014):

    *   18.6 Gerenciamento de memória dinâmica [support.dynamic]

*   Padrão C++11 (ISO/IEC 14882:2011):

    *   18.6 Gerenciamento de memória dinâmica [support.dynamic]

*   Padrão C++03 (ISO/IEC 14882:2003):

    *   18.4 Gerenciamento de memória dinâmica [lib.support.dynamic]

*   Padrão C++98 (ISO/IEC 14882:1998):

    *   18.4 Gerenciamento de memória dinâmica [lib.support.dynamic]

### Veja também

[ operator new](<#/doc/coroutine/generator/promise_type/operator_new>)[static] (C++23) | aloca memória usando `Allocator`
(função membro estática pública de `std::generator<Ref,V,Allocator>::promise_type`)
[ operator deleteoperator delete[]](<#/doc/memory/new/operator_delete>) | funções de desalocação
(função)
[ get_new_handler](<#/doc/memory/new/get_new_handler>)(C++11) | obtém o new handler atual
(função)
[ set_new_handler](<#/doc/memory/new/set_new_handler>) | registra um new handler
(função)
[ get_temporary_buffer](<#/doc/memory/get_temporary_buffer>)(obsoleto desde C++17)(removido desde C++20) | obtém armazenamento não inicializado
(function template)
[ malloc](<#/doc/memory/c/malloc>) | aloca memória
(função)
[ aligned_alloc](<#/doc/memory/c/aligned_alloc>)(C++17) | aloca memória alinhada
(função)