# operator delete, operator delete[]

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
funções de desalocação usuais substituíveis
void operator delete ( void* ptr ) throw();
void operator delete ( void* ptr ) noexcept;
void operator delete throw();
void operator delete noexcept;
void operator delete ( void* ptr, std::align_val_t al ) noexcept;
void operator delete noexcept;
void operator delete ( void* ptr, std::size_t sz ) noexcept;
void operator delete noexcept;
void operator delete ( void* ptr, std::size_t sz,
std::align_val_t al ) noexcept;
void operator delete[]( void* ptr, std::size_t sz,
std::align_val_t al ) noexcept;
funções de desalocação de placement substituíveis
void operator delete ( void* ptr, const std::nothrow_t& tag ) throw();
void operator delete ( void* ptr, const std::nothrow_t& tag ) noexcept;
void operator delete throw();
void operator delete noexcept;
void operator delete ( void* ptr, std::align_val_t al,
const std::nothrow_t& tag ) noexcept;
void operator delete[]( void* ptr, std::align_val_t al,
const std::nothrow_t& tag ) noexcept;
funções de desalocação de placement não alocadoras
void operator delete ( void* ptr, void* place ) throw();
void operator delete ( void* ptr, void* place ) noexcept;
void operator delete throw();
void operator delete noexcept;
funções de desalocação de placement definidas pelo usuário
void operator delete ( void* ptr, args... );
void operator delete;
funções de desalocação usuais específicas da classe
void T::operator delete ( void* ptr );
void T::operator delete;
void T::operator delete ( void* ptr, std::align_val_t al );
void T::operator delete;
void T::operator delete ( void* ptr, std::size_t sz );
void T::operator delete;
void T::operator delete ( void* ptr, std::size_t sz, std::align_val_t al );
void T::operator delete;
funções de desalocação de placement específicas da classe
void T::operator delete ( void* ptr, args... );
void T::operator delete;
funções de desalocação usuais de destruição específicas da classe
void T::operator delete( T* ptr, std::destroying_delete_t );
void T::operator delete( T* ptr, std::destroying_delete_t,
std::align_val_t al );
void T::operator delete( T* ptr, std::destroying_delete_t, std::size_t sz );
void T::operator delete( T* ptr, std::destroying_delete_t,
std::size_t sz, std::align_val_t al );
```

Desaloca o armazenamento previamente alocado por um [operator new](<#/doc/memory/new/operator_new>) correspondente. Essas funções de desalocação são chamadas por [delete-expressions](<#/doc/language/delete>) e por [new-expressions](<#/doc/language/new>) para desalocar memória após destruir (ou falhar na construção de) objetos com duração de armazenamento dinâmica. Elas também podem ser chamadas usando a sintaxe de chamada de função regular.

1) Chamada por [delete-expressions](<#/doc/language/delete>) para desalocar armazenamento previamente alocado para um único objeto.

O comportamento da implementação da biblioteca padrão desta função é indefinido, a menos que ptr seja um ponteiro nulo ou seja um ponteiro obtido anteriormente da implementação da biblioteca padrão de [operator new](<#/doc/memory/new/operator_new>)([std::size_t](<#/doc/types/size_t>)) ou [operator new](<#/doc/memory/new/operator_new>)([std::size_t](<#/doc/types/size_t>), [std::nothrow_t](<#/doc/memory/new/nothrow>)).

2) Chamada por [delete[]-expressions](<#/doc/language/delete>) para desalocar armazenamento previamente alocado para um array de objetos.

O comportamento da implementação da biblioteca padrão desta função é indefinido, a menos que ptr seja um ponteiro nulo ou seja um ponteiro obtido anteriormente da implementação da biblioteca padrão de [operator new](<#/doc/memory/new/operator_new>)[]([std::size_t](<#/doc/types/size_t>)) ou [operator new](<#/doc/memory/new/operator_new>)[]([std::size_t](<#/doc/types/size_t>), [std::nothrow_t](<#/doc/memory/new/nothrow>)).

3,4) O mesmo que (1,2), exceto que é chamada se o requisito de alinhamento exceder `__STDCPP_DEFAULT_NEW_ALIGNMENT__`.

5,6) Chamada em vez de (1,2) se uma substituição definida pelo usuário for fornecida, exceto que é não especificado se (1,2) ou (5,6) é chamada ao deletar objetos de tipo incompleto e arrays de tipos não-classe e tipos de classe trivialmente destrutíveis. Um alocador de memória pode usar o tamanho fornecido para ser mais eficiente.

As implementações da biblioteca padrão são idênticas a (1,2).

7,8) O mesmo que (5,6), exceto que é chamada se o requisito de alinhamento exceder `__STDCPP_DEFAULT_NEW_ALIGNMENT__`.

9) Chamada pelas [new-expressions](<#/doc/language/new>) de objeto único não-lançadoras se um construtor do objeto lançar uma exceção.

A implementação da biblioteca padrão se comporta da mesma forma que (1).

10) Chamada pelas [new[]-expressions](<#/doc/language/new>) de array não-lançadoras se um construtor de qualquer objeto lançar uma exceção (após executar os destrutores de todos os objetos no array que foram construídos com sucesso).

A implementação da biblioteca padrão se comporta da mesma forma que (2).

11,12) O mesmo que (9,10), exceto que é chamada se o requisito de alinhamento exceder `__STDCPP_DEFAULT_NEW_ALIGNMENT__`.

13) Chamada pela expressão standard single-object [placement new](<#/doc/language/new>) se o construtor do objeto lançar uma exceção.

A implementação da biblioteca padrão desta função não faz nada.

14) Chamada pela forma standard array da expressão [placement new[]](<#/doc/language/new>) se qualquer um dos construtores dos objetos lançar uma exceção (após executar os destrutores de todos os objetos que foram construídos com sucesso).

A implementação da biblioteca padrão desta função não faz nada.

15) Se definida, chamada pela expressão custom single-object [placement new](<#/doc/language/new>) com a assinatura correspondente se o construtor do objeto lançar uma exceção.

Se uma versão específica da classe (25) for definida, ela é chamada em preferência a (9).

Se nem (25) nem (15) for fornecida pelo usuário, nenhuma função de desalocação é chamada.

16) Se definida, chamada pela forma custom array da expressão [placement new[]](<#/doc/language/new>) com a assinatura correspondente se qualquer um dos construtores dos objetos lançar uma exceção (após executar os destrutores de todos os objetos que foram construídos com sucesso).

Se uma versão específica da classe (26) for definida, ela é chamada em preferência a (10).

Se nem (26) nem (16) for fornecida pelo usuário, nenhuma função de desalocação é chamada.

17) Se definida, chamada pelas [delete-expressions](<#/doc/language/delete>) usuais de objeto único se desalocando um objeto do tipo `T`.

18) Se definida, chamada pelas [delete[]-expressions](<#/doc/language/delete>) usuais de array se desalocando um array de objetos do tipo `T`.

19,20) Se definida, chamada em preferência a (17,18) se o requisito de alinhamento exceder `__STDCPP_DEFAULT_NEW_ALIGNMENT__`.

21) Se definida, e se (17) não for definida, chamada pelas [delete-expressions](<#/doc/language/delete>) usuais de objeto único se desalocando um objeto do tipo `T`.

22) Se definida, e se (18) não for definida, chamada pelas [delete[]-expressions](<#/>) usuais de array se desalocando um array de objetos do tipo `T`.

23,24) Se definida, e se (19,20) não forem definidas, chamada em preferência a membros que não reconhecem alocadores se o requisito de alinhamento exceder `__STDCPP_DEFAULT_NEW_ALIGNMENT__`.

25) Se definida, chamada pela expressão custom single-object [placement new](<#/doc/language/new>) com a assinatura correspondente se o construtor do objeto lançar uma exceção.

Se esta função não for fornecida, e uma (15) correspondente também não for fornecida, nenhuma função de desalocação é chamada.

26) Se definida, chamada pela forma custom array da expressão [placement new[]](<#/doc/language/new>) com a assinatura correspondente se qualquer um dos construtores dos objetos lançar uma exceção (após executar os destrutores de todos os objetos que foram construídos com sucesso).

Se esta função não for fornecida, e uma (16) correspondente também não for fornecida, nenhuma função de desalocação é chamada.

27-30) Se definida, [delete-expressions](<#/doc/language/delete>) não executa o destrutor para `*p` antes de fazer uma chamada para `operator delete`. Em vez disso, a invocação direta do destrutor, como por `p->~T();`, torna-se responsabilidade deste operator delete definido pelo usuário.

Consulte [delete-expression](<#/doc/language/delete>) para detalhes exatos sobre as regras de resolução de sobrecarga entre sobrecargas de funções de desalocação usuais (não-placement) que reconhecem e não reconhecem alinhamento. | (desde C++17)

Em todos os casos, se ptr for um ponteiro nulo, as funções de desalocação da biblioteca padrão não fazem nada. Se o ponteiro passado para a função de desalocação da biblioteca padrão não foi obtido da função de alocação da biblioteca padrão correspondente, o comportamento é indefinido.

Após o retorno da função de desalocação da biblioteca padrão, todos os ponteiros que se referem a qualquer parte do armazenamento desalocado tornam-se inválidos.

A indireção através de um ponteiro que se tornou inválido desta maneira e passá-lo para uma função de desalocação (double-delete) é comportamento indefinido. Qualquer outro uso é definido pela implementação.

### Parâmetros

- **ptr** — ponteiro para um bloco de memória a ser desalocado ou um ponteiro nulo
- **sz** — o tamanho que foi passado para a função de alocação correspondente
- **place** — ponteiro usado como parâmetro de placement no placement new correspondente
- **tag** — tag de desambiguação de sobrecarga correspondente à tag usada por operator new não-lançador
- **al** — alinhamento do objeto ou elemento de array que foi alocado
- **args** — parâmetros arbitrários correspondentes a uma função de alocação de placement (pode incluir [std::size_t](<#/doc/types/size_t>) e [std::align_val_t](<#/doc/memory/new/align_val_t>))

### Valor de retorno

(nenhum)

### Exceções

```cpp
Todas as funções de desalocação são noexcept(true), a menos que especificado de outra forma na declaração.  // (desde C++11)
```

Se uma função de desalocação terminar lançando uma exceção, o comportamento é indefinido, mesmo que seja declarada com noexcept(false)(desde C++11).

### Substituições globais

As funções de desalocação substituíveis ([1-12](<#/doc/memory/new/operator_delete>)) são implicitamente declaradas em cada unidade de tradução, mesmo que o cabeçalho [`<new>`](<#/doc/header/new>) não seja incluído. Essas funções são _substituíveis_ : uma função não-membro fornecida pelo usuário com a mesma assinatura definida em qualquer lugar do programa, em qualquer arquivo-fonte, substitui a versão implícita correspondente para todo o programa. Sua declaração não precisa ser visível.

O programa é malformado, sem diagnóstico necessário, se mais de uma substituição for fornecida no programa ou se uma substituição for declarada com o [especificador `inline`](<#/doc/language/inline>). O programa é malformado se uma substituição for definida em um namespace diferente do namespace global, ou se for definida como uma função estática não-membro no escopo global.

As implementações da biblioteca padrão das versões nothrow ([9,10](<#/doc/memory/new/operator_delete>)) chamam diretamente as versões lançadoras correspondentes ([1,2](<#/doc/memory/new/operator_delete>)). As implementações da biblioteca padrão das funções de desalocação que reconhecem tamanho ([5-8](<#/doc/memory/new/operator_delete>)) chamam diretamente as funções de desalocação correspondentes que não reconhecem tamanho ([1-4](<#/doc/memory/new/operator_delete>)). As implementações da biblioteca padrão das formas de array lançadoras que não reconhecem tamanho ([2,4](<#/doc/memory/new/operator_delete>)) chamam diretamente as formas de objeto único correspondentes ([1,3](<#/doc/memory/new/operator_delete>)). Assim, substituir as funções de desalocação de objeto único lançadoras ([1,3](<#/doc/memory/new/operator_delete>)) é suficiente para lidar com todas as desalocações.

Substituição global de `operator`s new/delete:

Execute este código
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
    // Compilado com GCC-5 no modo C++17 para obter o seguinte:
    1) op new(size_t), size = 4
    4) op delete(void*, size_t), size = 4
    2) op new, size = 40
    5) op delete
```

Sobrecargas de `operator delete` e `operator delete[]` com parâmetros adicionais definidos pelo usuário ("placement forms", ([15,16](<#/doc/memory/new/operator_delete>))) podem ser declaradas no escopo global como de costume, e são chamadas pelas placement forms correspondentes de _new-expressions_ se um construtor do objeto que está sendo alocado lançar uma exceção.

As placement forms da biblioteca padrão de `operator delete` ([13,14](<#/doc/memory/new/operator_delete>)) não podem ser substituídas e só podem ser personalizadas se a placement new-expression não usou a sintaxe `::new`, fornecendo um placement delete específico da classe ([25,26](<#/doc/memory/new/operator_delete>)) com assinatura correspondente: `void T::operator delete(void*, void*)` ou `void T::operator delete[](void*, void*)`.

### Sobrecargas específicas da classe

Funções de desalocação ([17-24](<#/doc/memory/new/operator_delete>)) podem ser definidas como funções membro estáticas de uma classe. Essas funções de desalocação, se fornecidas, são chamadas por [delete-expressions](<#/doc/language/delete>) ao deletar objetos ([17,19,21](<#/doc/memory/new/operator_delete>)) e arrays ([18,20,22](<#/doc/memory/new/operator_delete>)) desta classe, a menos que a delete expression tenha usado a forma `::delete` que ignora a pesquisa no escopo da classe. A palavra-chave `static` é opcional para essas declarações de função: seja a palavra-chave usada ou não, a função de desalocação é sempre uma função membro estática.

A delete expression procura o nome da função de desalocação apropriada começando pelo escopo da classe (a forma de array procura no escopo da classe do elemento do array) e prossegue para o escopo global se nenhum membro for encontrado, como de costume. Note que, de acordo com as [regras de name lookup](<#/doc/language/lookup>), quaisquer funções de desalocação declaradas no escopo da classe ocultam todas as funções de desalocação globais.

Se o tipo estático do objeto que está sendo deletado difere de seu tipo dinâmico (como ao deletar um objeto [polimórfico](<#/doc/language/objects>) através de um ponteiro para a base), e se o destrutor no tipo estático é virtual, a forma de objeto único de delete inicia a pesquisa do nome da função de desalocação a partir do ponto de definição do final overrider de seu destrutor virtual. Independentemente de qual função de desalocação seria executada em tempo de execução, a versão estaticamente visível de operator delete deve ser acessível para compilar. Em outros casos, ao deletar um array através de um ponteiro para a base, ou ao deletar através de um ponteiro para a base com destrutor não-virtual, o comportamento é indefinido.

Se a sobrecarga de argumento único ([17,18](<#/doc/memory/new/operator_delete>)) não for fornecida, mas a sobrecarga que reconhece tamanho, que recebe [std::size_t](<#/doc/types/size_t>) como segundo parâmetro ([21,22](<#/doc/memory/new/operator_delete>)), for fornecida, a forma que reconhece tamanho é chamada para desalocação normal, e o runtime C++ passa o tamanho do objeto a ser desalocado como o segundo argumento. Se ambas as formas forem definidas, a versão que não reconhece tamanho é chamada.

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    
    // sized class-specific deallocation functions
    struct X
    {
        static void operator delete(void* ptr, std::size_t sz)
        {
            std::cout << "custom delete for size " << sz << '\n';
            ::operator delete(ptr);
        }
    
        static void operator delete
        {
            std::cout << "custom delete for size " << sz << '\n';
            ::operator delete;
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
    custom delete for size 1
    custom delete for size 18
```

Sobrecargas de `operator delete` e `operator delete[]` com parâmetros adicionais definidos pelo usuário ("placement forms", ([25,26](<#/doc/memory/new/operator_delete>))) também podem ser definidas como membros de classe. Quando a expressão placement new falha e procura a função placement delete correspondente para chamar, ela inicia a pesquisa no escopo da classe antes de examinar o escopo global, e procura pela função com a assinatura que corresponde ao placement new:

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <stdexcept>
    
    struct X
    {
        X() { throw std::runtime_error("X(): std::runtime_error"); }
    
        // custom placement new
        static void* operator new(std::size_t sz, bool b)
        {
            std::cout << "custom placement new called, b = " << b << '\n';
            return ::operator new(sz);
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
        catch (const std::exception& ex)
        {
            std::cout << ex.what() << '\n';
        }
    }
```

Saída:
```
    custom placement new called, b = 1
    custom placement delete called, b = 1
    X(): std::runtime_error
```

Se `operator delete` em nível de classe for uma função template, ela deve ter o tipo de retorno `void`, o primeiro argumento `void*`, e deve ter dois ou mais parâmetros. Em outras palavras, apenas as placement forms podem ser templates. Uma instância de template nunca é uma função de desalocação usual, independentemente de sua assinatura. A especialização do template operator delete é escolhida com [template argument deduction](<#/doc/language/template_argument_deduction>).

### Notas

A chamada para o `T::operator delete` específico da classe em uma classe polimórfica é o único caso em que uma função membro estática é chamada através de dispatch dinâmico.

Se o comportamento de uma função de desalocação não satisfaz as restrições padrão, o comportamento é indefinido.

As seguintes funções são exigidas para serem thread-safe:

*   As versões da biblioteca de [`operator new`](<#/doc/memory/new/operator_new>) e `operator delete`
*   Versões de substituição do usuário de [`operator new`](<#/doc/memory/new/operator_new>) e `operator delete` globais
*   [std::calloc](<#/doc/memory/c/calloc>), [std::malloc](<#/doc/memory/c/malloc>), [std::realloc](<#/doc/memory/c/realloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), [std::free](<#/doc/memory/c/free>)

Chamadas para essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [acontece-antes](<#/doc/atomic/memory_order>) da próxima alocação (se houver) nesta ordem. | (desde C++11)
---|---|---|---
Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
[`__cpp_sized_deallocation`](<#/doc/feature_test>) | [`201309L`](<#/>) | (C++14) | Desalocação com tamanho
[`__cpp_impl_destroying_delete`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | Operator delete de destruição (suporte do compilador)
[`__cpp_lib_destroying_delete`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | Operator delete de destruição (suporte da biblioteca)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 220](<https://cplusplus.github.io/CWG/issues/220.html>) | C++98 | funções de desalocação definidas pelo usuário eram permitidas a lançar exceções | lançar exceções de uma função de desalocação resulta em comportamento indefinido
[CWG 1438](<https://cplusplus.github.io/CWG/issues/1438.html>) | C++98 | qualquer uso de um valor de ponteiro inválido era comportamento indefinido | apenas indireção e desalocação são
[LWG 206](<https://cplusplus.github.io/LWG/issue206>) | C++98 | substituir (2) não afetava o comportamento padrão de (10) | o comportamento padrão muda de acordo
[LWG 298](<https://cplusplus.github.io/LWG/issue298>) | C++98 | substituir (1) não afetava o comportamento padrão de (9) | o comportamento padrão muda de acordo
[LWG 404](<https://cplusplus.github.io/LWG/issue404>) | C++98 | substituições das funções de desalocação substituíveis podiam ser declaradas inline | proibido, sem diagnóstico necessário
[LWG 2458](<https://cplusplus.github.io/LWG/issue2458>) | C++14 | sobrecargas que recebiam (void*, [std::size_t](<#/doc/types/size_t>), const [std::nothrow_t](<#/doc/memory/new/nothrow>)&) eram especificadas, mas nunca podiam ser chamadas | removidas sobrecargas espúrias

### Veja também

[ operator delete](<#/doc/coroutine/generator/promise_type/operator_delete>)[static] (C++23) | desaloca memória previamente obtida de `operator new`
(função membro estática pública de `std::generator<Ref,V,Allocator>::promise_type`)
[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ return_temporary_buffer](<#/doc/memory/return_temporary_buffer>)(obsoleto em C++17)(removido em C++20) | libera armazenamento não inicializado
(modelo de função)
[ free](<#/doc/memory/c/free>) | desaloca memória previamente alocada
(função)