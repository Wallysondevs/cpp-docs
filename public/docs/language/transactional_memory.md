# Memória transacional (TM TS)

Memória transacional é um mecanismo de sincronização de concorrência que combina grupos de instruções em transações, que são

*   atômicas (ou todas as instruções ocorrem, ou nada ocorre)
*   isoladas (instruções em uma transação não podem observar escritas parcialmente concluídas feitas por outra transação, mesmo que executem em paralelo)

Implementações típicas usam memória transacional de hardware onde suportado e até os limites em que está disponível (por exemplo, até que o conjunto de alterações esteja saturado) e recorrem à memória transacional de software, geralmente implementada com concorrência otimista: se outra transação atualizou algumas das variáveis usadas por uma transação, ela é silenciosamente retentada. Por essa razão, transações retentáveis ("blocos atômicos") só podem chamar funções transaction-safe.

Note que acessar uma variável dentro e fora de uma transação sem outra sincronização externa é uma data race.

Se o teste de recursos for suportado, os recursos descritos aqui são indicados pela macro constante `__cpp_transactional_memory` com um valor igual ou maior que 201505.

### Blocos Synchronized

`synchronized` compound-statement

Executa o [compound statement](<#/doc/language/statements>) como se estivesse sob um lock global: todos os blocos synchronized mais externos no programa executam em uma única ordem total. O fim de cada bloco synchronized sincroniza com o início do próximo bloco synchronized nessa ordem. Blocos synchronized que estão aninhados dentro de outros blocos synchronized não possuem semânticas especiais.

Blocos synchronized não são transações (ao contrário dos blocos atomic abaixo) e podem chamar funções transaction-unsafe.

Execute este código
```cpp
    #include <iostream>
    #include <thread>
    #include <vector>
    
    int f()
    {
        static int i = 0;
        synchronized { // begin synchronized block
            std::cout << i << " -> ";
            ++i;       // each call to f() obtains a unique value of i
            std::cout << i << '\n';
            return i;  // end synchronized block
        }
    }
    
    int main()
    {
        std::vector<std::thread> v(10);
        for (auto& t : v)
            t = std::thread([] { for (int n = 0; n < 10; ++n) f(); });
        for (auto& t : v)
            t.join();
    }
```

Saída:
```
    0 -> 1
    1 -> 2
    2 -> 3
    ...
    99 -> 100
```

Sair de um bloco synchronized por qualquer meio (atingir o fim, executar goto, break, continue, ou return, ou lançar uma exceção) sai do bloco e sincroniza-com o próximo bloco na única ordem total se o bloco que saiu era um bloco externo. O comportamento é indefinido se [std::longjmp](<#/doc/utility/program/longjmp>) for usado para sair de um bloco synchronized.

Entrar em um bloco synchronized por goto ou switch não é permitido.

Embora os blocos synchronized executem como se estivessem sob um lock global, espera-se que as implementações examinem o código dentro de cada bloco e usem concorrência otimista (apoiada por memória transacional de hardware onde disponível) para código transaction-safe e locking mínimo para código não transaction-safe. Quando um bloco synchronized faz uma chamada para uma função não inlined, o compilador pode ter que sair da execução especulativa e manter um lock em torno de toda a chamada, a menos que a função seja declarada `transaction_safe` (veja abaixo) ou o atributo `[[optimize_for_synchronized]]` (veja abaixo) seja usado.

### Blocos Atomic

| Esta seção está incompleta

`atomic_noexcept` compound-statement

`atomic_cancel` compound-statement

`atomic_commit` compound-statement

1) Se uma exceção for lançada, [std::abort](<#/doc/utility/program/abort>) é chamada.

2) Se uma exceção for lançada, [std::abort](<#/doc/utility/program/abort>) é chamada, a menos que a exceção seja uma das exceções usadas para cancelamento de transação (veja abaixo), caso em que a transação é _cancelada_ : os valores de todos os locais de memória no programa que foram modificados por efeitos colaterais das operações do bloco atomic são restaurados para os valores que tinham no momento em que o início do bloco atomic foi executado, e a exceção continua o stack unwinding como de costume.

3) Se uma exceção for lançada, a transação é committed normalmente.

As exceções usadas para cancelamento de transação em blocos `atomic_cancel` são [std::bad_alloc](<#/doc/memory/new/bad_alloc>), [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>), [std::bad_cast](<#/doc/types/bad_cast>), [std::bad_typeid](<#/doc/types/bad_typeid>), [std::bad_exception](<#/doc/error/bad_exception>), [std::exception](<#/doc/error/exception>) e todas as exceções da standard library derivadas dela, e o tipo de exceção especial [`std::tx_exception<T>`](<#/doc/error/tx_exception>).

O compound-statement em um bloco atomic não tem permissão para executar qualquer expressão ou instrução ou chamar qualquer função que não seja `transaction_safe` (isso é um erro em tempo de compilação).
```cpp
    // each call to f() retrieves a unique value of i, even when done in parallel
    int f()
    {
        static int i = 0;
        atomic_noexcept { // begin transaction
    //  printf("before %d\n", i); // error: cannot call a non transaction-safe function
            ++i;
            return i; // commit transaction
        }
    }
```

Sair de um bloco atomic por qualquer meio que não seja uma exceção (atingir o fim, goto, break, continue, return) commits a transação. O comportamento é indefinido se [std::longjmp](<#/doc/utility/program/longjmp>) for usado para sair de um bloco atomic.

### Funções Transaction-safe

| Esta seção está incompleta

Uma função pode ser explicitamente declarada como transaction-safe usando a palavra-chave `transaction_safe` em sua declaração.

| Esta seção está incompleta

Em uma declaração [lambda](<#/doc/language/lambda>), ela aparece imediatamente após a capture list, ou imediatamente após a palavra-chave `mutable` (se uma for usada).

| Esta seção está incompleta
```cpp
    extern volatile int * p = 0;
    struct S
    {
        virtual ~S();
    };
    int f() transaction_safe
    {
        int x = 0;  // ok: not volatile
        p = &x;     // ok: the pointer is not volatile
        int i = *p; // error: read through volatile glvalue
        S s;        // error: invocation of unsafe destructor
    }
```
```cpp
    int f(int x) { // implicitly transaction-safe
        if (x <= 0)
            return 0;
        return x + f(x - 1);
    }
```

Se uma função que não é transaction-safe for chamada através de uma referência ou ponteiro para uma função transaction-safe, o comportamento é indefinido.

Ponteiros para funções transaction-safe e ponteiros para funções membro transaction-safe são implicitamente conversíveis para ponteiros para funções e ponteiros para funções membro, respectivamente. É não especificado se o ponteiro resultante se compara igual ao original.

#### Funções virtuais Transaction-safe

| Esta seção está incompleta

Se o final overrider de uma função `transaction_safe_dynamic` não for declarado `transaction_safe`, chamá-lo em um bloco atomic é comportamento indefinido.

### Standard library

Além de introduzir o novo template de exceção [`std::tx_exception`](<#/doc/error/tx_exception>), a especificação técnica de memória transacional faz as seguintes alterações na standard library:

*   torna as seguintes funções explicitamente `transaction_safe`:

    *   [std::forward](<#/doc/utility/forward>), std::move, [std::move_if_noexcept](<#/doc/utility/move_if_noexcept>), [std::align](<#/doc/memory/align>), [std::abort](<#/doc/utility/program/abort>), [operator new](<#/doc/memory/new/operator_new>) global padrão, [operator delete](<#/doc/memory/new/operator_delete>) global padrão, [std::allocator::construct](<#/doc/memory/allocator/construct>) se o construtor invocado for transaction-safe, [std::allocator::destroy](<#/doc/memory/allocator/destroy>) se o destrutor invocado for transaction-safe, [std::get_temporary_buffer](<#/doc/memory/get_temporary_buffer>), [std::return_temporary_buffer](<#/doc/memory/return_temporary_buffer>), [std::addressof](<#/doc/memory/addressof>), [std::pointer_traits::pointer_to](<#/doc/memory/pointer_traits/pointer_to>), cada função membro não virtual de todos os tipos de exceção que suportam cancelamento de transação (veja `atomic_cancel` acima)
| Esta seção está incompleta
Razão: há mais

*   torna as seguintes funções explicitamente `transaction_safe_dynamic`

    *   cada função membro virtual de todos os tipos de exceção que suportam cancelamento de transação (veja `atomic_cancel` acima)

*   exige que todas as operações que são transaction-safe em um [Allocator](<#/doc/named_req/Allocator>) X sejam transaction-safe em `X::rebind<>::other`

### Atributos

O atributo `[[[optimize_for_synchronized](<#/doc/language/attributes/optimize_for_synchronized>)]]` pode ser aplicado a um declarator em uma declaração de função e deve aparecer na primeira declaração da função.

Se uma função for declarada `[[optimize_for_synchronized]]` em uma translation unit e a mesma função for declarada sem `[[optimize_for_synchronized]]` em outra translation unit, o programa é malformado; nenhum diagnóstico é exigido.

Isso indica que a definição da função deve ser otimizada para invocação a partir de uma instrução synchronized. Em particular, evita serializar blocos synchronized que fazem uma chamada para uma função que é transaction-safe para a maioria das chamadas, mas não para todas as chamadas (por exemplo, inserção em tabela hash que pode ter que rehash, allocator que pode ter que solicitar um novo bloco, uma função simples que pode raramente logar).
```cpp
    std::atomic<bool> rehash{false};
    
    // maintenance thread runs this loop
    void maintenance_thread(void*)
    {
        while (!shutdown)
        {
            synchronized
            {
                if (rehash)
                {
                    hash.rehash();
                    rehash = false;
                }
            }
        }
    }
    
    // worker threads execute hundreds of thousands of calls to this function 
    // every second. Calls to insert_key() from synchronized blocks in other
    // translation units will cause those blocks to serialize, unless insert_key()
    // is marked [[optimize_for_synchronized]]
    [[optimize_for_synchronized]] void insert_key(char* key, char* value)
    {
        bool concern = hash.insert(key, value);
        if (concern)
            rehash = true;
    }
```

Assembly GCC sem o atributo: a função inteira é serializada
```assembly
    insert_key(char*, char*):
    	subq	$8, %rsp
    	movq	%rsi, %rdx
    	movq	%rdi, %rsi
    	movl	$hash, %edi
    	call	Hash::insert(char*, char*)
    	testb	%al, %al
    	je	.L20
    	movb	$1, rehash(%rip)
    	mfence
    .L20:
    	addq	$8, %rsp
    	ret
    
```

Assembly GCC com o atributo:
```assembly
    transaction clone for insert_key(char*, char*):
    	subq	$8, %rsp
    	movq	%rsi, %rdx
    	movq	%rdi, %rsi
    	movl	$hash, %edi
    	call	transaction clone for Hash::insert(char*, char*)
    	testb	%al, %al
    	je	.L27
    	xorl	%edi, %edi
    	call	_ITM_changeTransactionMode # Note: this is the serialization point
    	movb	$1, rehash(%rip)
    	mfence
    .L27:
    	addq	$8, %rsp
    	ret
    
```

| Esta seção está incompleta
Razão: verificar assembly com trunk, também mostrar alterações no lado do chamador

### Notas

| Esta seção está incompleta
Razão: notas de experiência do artigo/palestra de Wyatt

### Palavras-chave

[`atomic_cancel`](<#/doc/keyword/atomic_cancel>), [`atomic_commit`](<#/doc/keyword/atomic_commit>), [`atomic_noexcept`](<#/doc/keyword/atomic_noexcept>), [`synchronized`](<#/doc/keyword/synchronized>), [`transaction_safe`](<#/doc/keyword/transaction_safe>), [`transaction_safe_dynamic`](<#/doc/keyword/transaction_safe_dynamic>)

### Suporte do compilador

Esta especificação técnica é suportada pelo GCC a partir da versão 6.1 (requer -fgnu-tm para habilitar). Uma variante mais antiga desta especificação foi [suportada no GCC](<http://www-users.cs.umn.edu/~boutcher/stm/>) a partir da versão 4.7.
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Standard em que o recurso é introduzido; DR significa relatório de defeito contra essa revisão