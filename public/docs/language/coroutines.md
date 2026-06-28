# Coroutines (C++20)

Uma coroutine é uma função que pode suspender a execução para ser retomada posteriormente. Coroutines são *stackless*: elas suspendem a execução retornando para o chamador, e os dados necessários para retomar a execução são armazenados separadamente da stack. Isso permite código sequencial que executa assincronamente (por exemplo, para lidar com I/O não bloqueante sem callbacks explícitos), e também suporta algoritmos em sequências infinitas computadas de forma *lazy* e outros usos.

Uma função é uma coroutine se sua definição contiver qualquer um dos seguintes:

  * a expressão co_await — para suspender a execução até ser retomada

```cpp
    task<> tcp_echo_server()
    {
        char data[1024];
        while (true)
        {
            std::size_t n = co_await socket.async_read_some(buffer(data));
            co_await async_write(socket, buffer(data, n));
        }
    }
```

  * a expressão co_yield — para suspender a execução retornando um valor

```cpp
    generator<unsigned int> iota(unsigned int n = 0)
    {
        while (true)
            co_yield n++;
    }
```

  * a instrução co_return — para completar a execução retornando um valor

```cpp
    lazy<int> f()
    {
        co_return 7;
    }
```

Toda coroutine deve ter um tipo de retorno que satisfaça uma série de requisitos, observados abaixo.

### Restrições

Coroutines não podem usar [argumentos variádicos](<#/doc/language/variadic_arguments>), instruções [return](<#/doc/language/return>) simples, ou [tipos de retorno placeholder](<#/doc/language/function>) ([`auto`](<#/doc/language/auto>) ou [Concept](<#/doc/language/constraints>)).

[Funções consteval](<#/doc/language/consteval>), [funções constexpr](<#/doc/language/constexpr>), [construtores](<#/doc/language/initializer_list>), [destrutores](<#/doc/language/destructor>), e a [função main](<#/doc/language/main_function>) não podem ser coroutines.

### Execução

Cada coroutine está associada a

  * o _promise object_ , manipulado de dentro da coroutine. A coroutine submete seu resultado ou exceção através deste objeto. Promise objects não estão de forma alguma relacionados a [std::promise](<#/doc/thread/promise>).
  * o _coroutine handle_ , manipulado de fora da coroutine. Este é um handle não proprietário usado para retomar a execução da coroutine ou para destruir o coroutine frame.
  * o _coroutine state_ , que é um armazenamento interno, alocado dinamicamente (a menos que a alocação seja otimizada), objeto que contém

    

  * o promise object
  * os parâmetros (todos copiados por valor)
  * alguma representação do ponto de suspensão atual, para que uma retomada saiba onde continuar, e uma destruição saiba quais variáveis locais estavam no escopo
  * variáveis locais e temporários cuja vida útil abrange o ponto de suspensão atual.

Quando uma coroutine inicia a execução, ela realiza o seguinte:

  * [aloca](<#/doc/language/coroutines>) o objeto coroutine state usando [operator new](<#/doc/memory/new/operator_new>).
  * copia todos os parâmetros da função para o coroutine state: parâmetros por valor são movidos ou copiados, parâmetros por referência permanecem referências (assim, podem se tornar dangling, se a coroutine for retomada após o término da vida útil do objeto referenciado — veja exemplos abaixo).
  * chama o construtor para o promise object. Se o tipo do promise tiver um construtor que aceita todos os parâmetros da coroutine, esse construtor é chamado, com os argumentos da coroutine pós-cópia. Caso contrário, o construtor padrão é chamado.
  * chama promise.get_return_object() e mantém o resultado em uma variável local. O resultado dessa chamada será retornado ao chamador quando a coroutine suspender pela primeira vez. Quaisquer exceções lançadas até e incluindo esta etapa propagam de volta para o chamador, não sendo colocadas no promise.
  * chama promise.initial_suspend() e `co_await`a seu resultado. Tipos `Promise` típicos retornam um [std::suspend_always](<#/doc/coroutine/suspend_always>), para coroutines iniciadas de forma *lazy*, ou [std::suspend_never](<#/doc/coroutine/suspend_never>), para coroutines iniciadas de forma *eager*.
  * quando co_await promise.initial_suspend() retoma, começa a executar o corpo da coroutine.

Alguns exemplos de um parâmetro se tornando dangling:
```cpp
    #include <coroutine>
    #include <iostream>
     
    struct promise;
     
    struct coroutine : std::coroutine_handle<promise>
    {
        using promise_type = ::promise;
    };
     
    struct promise
    {
        coroutine get_return_object() { return {coroutine::from_promise(*this)}; }
        std::suspend_always initial_suspend() noexcept { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
    };
     
    struct S
    {
        int i;
        coroutine f()
        {
            std::cout << i;
            co_return;
        }
    };
     
    void bad1()
    {
        coroutine h = S{0}.f();
        // S{0} destruído
        h.resume(); // coroutine retomada executa std::cout << i, usa S::i após liberação
        h.destroy();
    }
     
    coroutine bad2()
    {
        S s{0};
        return s.f(); // coroutine retornada não pode ser retomada sem cometer uso após liberação
    }
     
    void bad3()
    {
        coroutine h = i = 0 -> coroutine // uma lambda que também é uma coroutine
        {
            std::cout << i;
            co_return;
        }(); // invocada imediatamente
        // lambda destruída
        h.resume(); // usa (tipo lambda anônimo)::i após liberação
        h.destroy();
    }
     
    void good()
    {
        coroutine h =  -> coroutine // torna i um parâmetro da coroutine
        {
            std::cout << i;
            co_return;
        }(0);
        // lambda destruída
        h.resume(); // sem problema, i foi copiado para a coroutine
                    // frame como um parâmetro por valor
        h.destroy();
    }
```

Quando uma coroutine atinge um ponto de suspensão

  * o objeto de retorno obtido anteriormente é retornado ao chamador/retomador, após conversão implícita para o tipo de retorno da coroutine, se necessário.

Quando uma coroutine atinge a instrução co_return, ela realiza o seguinte:

  * chama promise.return_void() para

    

  * co_return;
  * co_return expr; onde expr tem tipo void

  * ou chama promise.return_value(expr) para co_return expr; onde expr tem tipo não-void
  * destrói todas as variáveis com duração de armazenamento automática na ordem inversa em que foram criadas.
  * chama promise.final_suspend() e co_awaita o resultado.

Cair do final da coroutine é equivalente a co_return;, exceto que o comportamento é indefinido se nenhuma declaração de `return_void` puder ser encontrada no escopo de `Promise`. Uma função sem nenhuma das palavras-chave definidoras em seu corpo não é uma coroutine, independentemente de seu tipo de retorno, e cair do final resulta em comportamento indefinido se o tipo de retorno não for void (possivelmente cv-qualificado).
```cpp
    // assumindo que task é algum tipo de task de coroutine
    task<void> f()
    {
        // não é uma coroutine, comportamento indefinido
    }
     
    task<void> g()
    {
        co_return;  // OK
    }
     
    task<void> h()
    {
        co_await g();
        // OK, co_return implícito;
    }
```

Se a coroutine terminar com uma exceção não capturada, ela realiza o seguinte:

  * captura a exceção e chama promise.unhandled_exception() de dentro do bloco catch
  * chama promise.final_suspend() e co_awaita o resultado (por exemplo, para retomar uma continuação ou publicar um resultado). É comportamento indefinido retomar uma coroutine a partir deste ponto.

Quando o coroutine state é destruído, seja porque terminou via co_return ou exceção não capturada, ou porque foi destruído via seu handle, ele faz o seguinte:

  * chama o destrutor do promise object.
  * chama os destrutores das cópias dos parâmetros da função.
  * chama [operator delete](<#/doc/memory/new/operator_delete>) para liberar a memória usada pelo coroutine state.
  * transfere a execução de volta para o chamador/retomador.

### Alocação Dinâmica

O coroutine state é alocado dinamicamente via [operator new](<#/doc/memory/new/operator_new>) não-array.

Se o tipo `Promise` definir uma substituição em nível de classe, ela será usada; caso contrário, o [operator new](<#/doc/memory/new/operator_new>) global será usado.

Se o tipo `Promise` definir uma forma de *placement* de [operator new](<#/doc/memory/new/operator_new>) que aceita parâmetros adicionais, e eles corresponderem a uma lista de argumentos onde o primeiro argumento é o tamanho solicitado (do tipo [std::size_t](<#/doc/types/size_t>)) e o restante são os argumentos da função coroutine, esses argumentos serão passados para [operator new](<#/doc/memory/new/operator_new>) (isso torna possível usar a [convenção de alocador principal](<#/doc/memory/uses_allocator>) para coroutines).

A chamada para [operator new](<#/doc/memory/new/operator_new>) pode ser otimizada (mesmo que um alocador personalizado seja usado) se

  * A vida útil do coroutine state estiver estritamente aninhada dentro da vida útil do chamador, e
  * o tamanho do coroutine frame for conhecido no local da chamada.

Nesse caso, o coroutine state é incorporado no stack frame do chamador (se o chamador for uma função comum) ou no coroutine state (se o chamador for uma coroutine).

Se a alocação falhar, a coroutine lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>), a menos que o tipo `Promise` defina a função membro Promise::get_return_object_on_allocation_failure(). Se essa função membro for definida, a alocação usa a forma nothrow de [operator new](<#/doc/memory/new/operator_new>) e, em caso de falha na alocação, a coroutine retorna imediatamente o objeto obtido de Promise::get_return_object_on_allocation_failure() para o chamador, por exemplo:
```cpp
    struct Coroutine::promise_type
    {
        /* ... */
     
        // garante o uso de operator-new que não lança exceções
        static Coroutine get_return_object_on_allocation_failure()
        {
            std::cerr << __func__ << '\n';
            throw std::bad_alloc(); // ou, retorna Coroutine(nullptr);
        }
     
        // sobrecarga personalizada de new que não lança exceções
        void* operator new(std::size_t n) noexcept
        {
            if (void* mem = std::malloc(n))
                return mem;
            return nullptr; // falha na alocação
        }
    };
```

### Promise

O tipo `Promise` é determinado pelo compilador a partir do tipo de retorno da coroutine usando [std::coroutine_traits](<#/doc/coroutine/coroutine_traits>).

Formalmente, seja

  * `R` e `Args...` denotam o tipo de retorno e a lista de tipos de parâmetros de uma coroutine, respectivamente,
  * `ClassT` denota o tipo de classe ao qual a coroutine pertence se for definida como uma função membro não-estática,
  * `cv` denota a qualificação cv declarada na [declaração da função](<#/doc/language/function>) se for definida como uma função membro não-estática,

seu tipo `Promise` é determinado por:

  * [std::coroutine_traits](<#/doc/coroutine/coroutine_traits>)<R, Args...>::promise_type, se a coroutine não for definida como uma [função membro de objeto implícito](<#/doc/language/member_functions>),
  * [std::coroutine_traits](<#/doc/coroutine/coroutine_traits>)<R,` `cv` `ClassT&, Args...>::promise_type, se a coroutine for definida como uma função membro de objeto implícito que não é qualificada por referência rvalue,
  * [std::coroutine_traits](<#/doc/coroutine/coroutine_traits>)<R,` `cv` `ClassT&&, Args...>::promise_type, se a coroutine for definida como uma função membro de objeto implícito que é qualificada por referência rvalue.

Por exemplo:

| Se a coroutine for definida como ... | então seu tipo `Promise` é ... |
|---|---|
```cpp
| task<void> foo(int x); | std::coroutine_traits<task<void>, int>::promise_type
| task<void> Bar::foo(int x) const; | std::coroutine_traits<task<void>, const Bar&, int>::promise_type
| task<void> Bar::foo(int x) &&; | std::coroutine_traits<task<void>, Bar&&, int>::promise_type
```

### co_await

O operador unário co_await suspende uma coroutine e retorna o controle ao chamador.

---
`co_await` expr
---

Uma expressão co_await só pode aparecer em uma expressão [potencialmente avaliada](<#/doc/language/expressions>) dentro de um [corpo de função](<#/doc/language/function>) regular (incluindo o corpo de função de uma [expressão lambda](<#/doc/language/lambda>)), e não pode aparecer

  * em um [handler](<#/doc/language/catch>),
  * em uma instrução de [declaração](<#/doc/language/declarations>), a menos que apareça em um inicializador dessa instrução de declaração,
  * na [declaração simples](<#/doc/language/declarations>) de uma init-statement (veja [`if`](<#/doc/language/if>), [`switch`](<#/doc/language/switch>), [`for`](<#/doc/language/for>) e [range-for](<#/doc/language/range-for>)), a menos que apareça em um inicializador dessa init-statement,
  * em um [argumento padrão](<#/doc/language/default_arguments>), ou
  * no inicializador de uma variável com escopo de bloco com [duração de armazenamento](<#/doc/language/storage_duration>) estática ou de thread.

Primeiro, expr é convertido para um awaitable da seguinte forma:

  * se expr for produzido por um ponto de suspensão inicial, um ponto de suspensão final ou uma expressão yield, o awaitable é expr, como está.
  * caso contrário, se o tipo `Promise` da coroutine atual tiver a função membro `await_transform`, então o awaitable é promise.await_transform(expr).
  * caso contrário, o awaitable é expr, como está.

Então, o objeto awaiter é obtido, da seguinte forma:

  * se a resolução de sobrecarga para o operador co_await resultar em uma única melhor sobrecarga, o awaiter é o resultado dessa chamada:

    

  * awaitable.operator co_await() para sobrecarga de membro,
  * operator co_await(static_cast<Awaitable&&>(awaitable)) para a sobrecarga não-membro.

  * caso contrário, se a resolução de sobrecarga não encontrar nenhum operator co_await, o awaiter é awaitable, como está.
  * caso contrário, se a resolução de sobrecarga for ambígua, o programa é malformado.

Se a expressão acima for um [prvalue](<#/doc/language/value_category>), o objeto awaiter é um temporário [materializado](<#/doc/language/implicit_cast>) a partir dele. Caso contrário, se a expressão acima for um [glvalue](<#/doc/language/value_category>), o objeto awaiter é o objeto ao qual ele se refere.

Então, awaiter.await_ready() é chamado (este é um atalho para evitar o custo da suspensão se for sabido que o resultado está pronto ou pode ser completado sincronicamente). Se seu resultado, contextualmente convertido para bool, for false então

     A coroutine é suspensa (seu coroutine state é preenchido com variáveis locais e o ponto de suspensão atual).
     awaiter.await_suspend(handle) é chamado, onde handle é o coroutine handle representando a coroutine atual. Dentro dessa função, o coroutine state suspenso é observável via esse handle, e é responsabilidade dessa função agendá-lo para retomar em algum executor, ou para ser destruído (retornar false conta como agendamento)

  * se `await_suspend` retornar void, o controle é imediatamente retornado ao chamador/retomador da coroutine atual (esta coroutine permanece suspensa), caso contrário
  * se `await_suspend` retornar bool,

    

  * o valor true retorna o controle ao chamador/retomador da coroutine atual
  * o valor false retoma a coroutine atual.

  * se `await_suspend` retornar um coroutine handle para alguma outra coroutine, esse handle é retomado (por uma chamada a handle.resume()) (note que isso pode encadear para eventualmente fazer com que a coroutine atual seja retomada).
  * se `await_suspend` lançar uma exceção, a exceção é capturada, a coroutine é retomada, e a exceção é imediatamente relançada.

Finalmente, awaiter.await_resume() é chamado (independentemente de a coroutine ter sido suspensa ou não), e seu resultado é o resultado de toda a expressão co_await expr.

Se a coroutine foi suspensa na expressão co_await, e for retomada posteriormente, o ponto de retomada é imediatamente antes da chamada para awaiter.await_resume().

Note que a coroutine é totalmente suspensa antes de entrar em awaiter.await_suspend(). Seu handle pode ser compartilhado com outra thread e retomado antes que a função await_suspend() retorne. (Note que as regras padrão de segurança de memória ainda se aplicam, então se um coroutine handle for compartilhado entre threads sem um lock, o awaiter deve usar pelo menos [semântica de liberação](<#/doc/atomic/memory_order>) e o retomador deve usar pelo menos [semântica de aquisição](<#/doc/atomic/memory_order>).) Por exemplo, o coroutine handle pode ser colocado dentro de um callback, agendado para ser executado em um pool de threads quando a operação de I/O assíncrona for concluída. Nesse caso, como a coroutine atual pode ter sido retomada e, portanto, executado o destrutor do objeto awaiter, tudo concorrentemente enquanto await_suspend() continua sua execução na thread atual, await_suspend() deve tratar *this como destruído e não acessá-lo depois que o handle foi publicado para outras threads.

### Exemplo

Execute este código
```cpp
    #include <coroutine>
    #include <iostream>
    #include <stdexcept>
    #include <thread>
     
    auto switch_to_new_thread(std::jthread& out)
    {
        struct awaitable
        {
            std::jthread* p_out;
            bool await_ready() { return false; }
            void await_suspend(std::coroutine_handle<> h)
            {
                std::jthread& out = *p_out;
                if (out.joinable())
                    throw std::runtime_error("Output jthread parameter not empty");
                out = std::jthread([h] { h.resume(); });
                // Comportamento indefinido potencial: acessando *this potencialmente destruído
                // std::cout << "New thread ID: " << p_out->get_id() << '\n';
                std::cout << "New thread ID: " << out.get_id() << '\n'; // isso está OK
            }
            void await_resume() {}
        };
        return awaitable{&out};
    }
     
    struct task
    {
        struct promise_type
        {
            task get_return_object() { return {}; }
            std::suspend_never initial_suspend() { return {}; }
            std::suspend_never final_suspend() noexcept { return {}; }
            void return_void() {}
            void unhandled_exception() {}
        };
    };
     
    task resuming_on_new_thread(std::jthread& out)
    {
        std::cout << "Coroutine started on thread: " << std::this_thread::get_id() << '\n';
        co_await switch_to_new_thread(out);
        // awaiter destruído aqui
        std::cout << "Coroutine resumed on thread: " << std::this_thread::get_id() << '\n';
    }
     
    int main()
    {
        std::jthread out;
        resuming_on_new_thread(out);
    }
```

Saída possível:
```
    Coroutine started on thread: 139972277602112
    New thread ID: 139972267284224
    Coroutine resumed on thread: 139972267284224
```

Nota: o objeto awaiter faz parte do coroutine state (como um temporário cuja vida útil cruza um ponto de suspensão) e é destruído antes que a expressão co_await termine. Ele pode ser usado para manter o estado por operação, conforme exigido por algumas APIs de I/O assíncronas, sem recorrer a alocações dinâmicas adicionais.

A standard library define dois awaitables triviais: [std::suspend_always](<#/doc/coroutine/suspend_always>) e [std::suspend_never](<#/doc/coroutine/suspend_never>).

| Esta seção está incompleta
| Razão: exemplos
|---|---

Demonstração de promise_type::await_transform e um awaiter fornecido pelo programa
---

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <coroutine>
    #include <iostream>
     
    struct tunable_coro
    {
        // Um awaiter cuja "prontidão" é determinada via parâmetro do construtor.
        class tunable_awaiter
        {
            bool ready_;
        public:
            explicit(false) tunable_awaiter(bool ready) : ready_{ready} {}
            // Três funções de interface awaiter padrão:
            bool await_ready() const noexcept { return ready_; }
            static void await_suspend(std::coroutine_handle<>) noexcept {}
            static void await_resume() noexcept {}
        };
     
        struct promise_type
        {
            using coro_handle = std::coroutine_handle<promise_type>;
            auto get_return_object() { return coro_handle::from_promise(*this); }
            static auto initial_suspend() { return std::suspend_always(); }
            static auto final_suspend() noexcept { return std::suspend_always(); }
            static void return_void() {}
            static void unhandled_exception() { std::terminate(); }
            // Uma função de transformação fornecida pelo usuário que retorna o awaiter personalizado:
            auto await_transform(std::suspend_always) { return tunable_awaiter(!ready_); }
            void disable_suspension() { ready_ = false; }
        private:
            bool ready_{true};
        };
     
        tunable_coro(promise_type::coro_handle h) : handle_(h) { assert(h); }
     
        // Para simplificar, declare estas 4 funções especiais como deleted:
        tunable_coro(tunable_coro const&) = delete;
        tunable_coro(tunable_coro&&) = delete;
        tunable_coro& operator=(tunable_coro const&) = delete;
        tunable_coro& operator=(tunable_coro&&) = delete;
     
        ~tunable_coro()
        {
            if (handle_)
                handle_.destroy();
        }
     
        void disable_suspension() const
        {
            if (handle_.done())
                return;
            handle_.promise().disable_suspension();
            handle_();
        }
     
        bool operator()()
        {
            if (!handle_.done())
                handle_();
            return !handle_.done();
        }
    private:
        promise_type::coro_handle handle_;
    };
     
    tunable_coro generate(int n)
    {
        for (int i{}; i != n; ++i)
        {
            std::cout << i << ' ';
            // O awaiter passado para co_await vai para promise_type::await_transform que
            // emite tunable_awaiter que inicialmente causa suspensão (retornando para
            // main a cada iteração), mas após uma chamada para disable_suspension nenhuma suspensão
            // acontece e o loop executa até o fim sem retornar para main().
            co_await std::suspend_always{};
        }
    }
     
    int main()
    {
        auto coro = generate(8);
        coro(); // emite apenas o primeiro elemento == 0
        for (int k{}; k < 4; ++k)
        {
            coro(); // emite 1 2 3 4, um por cada iteração
            std::cout << ": ";
        }
        coro.disable_suspension();
        coro(); // emite os números finais 5 6 7 todos de uma vez
    }
```

Saída:
```
    0 1 : 2 : 3 : 4 : 5 6 7
```

### co_yield

A expressão `co_yield` retorna um valor ao chamador e suspende a coroutine atual: é o bloco de construção comum de funções geradoras retomáveis.

---
`co_yield` expr
`co_yield` braced-init-list
---

É equivalente a
```cpp
    co_await promise.yield_value(expr)
```

Um `yield_value` típico de um gerador armazenaria (copiaria/moveria ou apenas armazenaria o endereço de, já que a vida útil do argumento cruza o ponto de suspensão dentro do `co_await`) seu argumento no objeto gerador e retornaria [std::suspend_always](<#/doc/coroutine/suspend_always>), transferindo o controle para o chamador/retomador.

Execute este código
```cpp
    #include <coroutine>
    #include <cstdint>
    #include <exception>
    #include <iostream>
     
    template<typename T>
    struct Generator
    {
        // O nome da classe 'Generator' é nossa escolha e não é exigido para a magia das coroutines.
        // O compilador reconhece a coroutine pela presença da palavra-chave 'co_yield'.
        // Você pode usar o nome 'MyGenerator' (ou qualquer outro nome) em vez disso, desde que inclua
        // a struct aninhada promise_type com o método 'MyGenerator get_return_object()'.
        // (Nota: É necessário ajustar as declarações de construtores e destrutores
        //  ao renomear.)
     
        struct promise_type;
        using handle_type = std::coroutine_handle<promise_type>;
     
        struct promise_type // required
        {
            T value_;
            std::exception_ptr exception_;
     
            Generator get_return_object()
            {
                return Generator(handle_type::from_promise(*this));
            }
            std::suspend_always initial_suspend() { return {}; }
            std::suspend_always final_suspend() noexcept { return {}; }
            void unhandled_exception() { exception_ = std::current_exception(); } // salvando
                                                                                  // exceção
     
            template<std::convertible_to<T> From> // concept C++20
            std::suspend_always yield_value(From&& from)
            {
                value_ = std::forward<From>(from); // armazenando o resultado em promise
                return {};
            }
            void return_void() {}
        };
     
        handle_type h_;
     
        Generator(handle_type h) : h_(h) {}
        ~Generator() { h_.destroy(); }
        explicit operator bool()
        {
            fill(); // A única maneira de descobrir de forma confiável se terminamos a coroutine,
                    // se haverá ou não um próximo valor gerado (co_yield)
                    // na coroutine via getter C++ (operator () abaixo) é executar/retomar
                    // a coroutine até o próximo ponto co_yield (ou deixá-la terminar).
                    // Então armazenamos/cacheamos o resultado em promise para permitir que o getter (operator() abaixo
                    // o pegue sem executar a coroutine).
            return !h_.done();
        }
        T operator()()
        {
            fill();
            full_ = false; // vamos mover o resultado previamente armazenado em cache
                           // para deixar a promise vazia novamente
            return std::move(h_.promise().value_);
        }
     
    private:
        bool full_ = false;
     
        void fill()
        {
            if (!full_)
            {
                h_();
                if (h_.promise().exception_)
                    std::rethrow_exception(h_.promise().exception_);
                // propaga exceção da coroutine no contexto chamado
     
                full_ = true;
            }
        }
    };
     
    Generator<std::uint64_t>
    fibonacci_sequence(unsigned n)
    {
        if (n == 0)
            co_return;
     
        if (n > 94)
            throw std::runtime_error("Too big Fibonacci sequence. Elements would overflow.");
     
        co_yield 0;
     
        if (n == 1)
            co_return;
     
        co_yield 1;
     
        if (n == 2)
            co_return;
     
        std::uint64_t a = 0;
        std::uint64_t b = 1;
     
        for (unsigned i = 2; i < n; ++i)
        {
            std::uint64_t s = a + b;
            co_yield s;
            a = b;
            b = s;
        }
    }
     
    int main()
    {
        try
        {
            auto gen = fibonacci_sequence(10); // máximo 94 antes que uint64_t transborde
     
            for (int j = 0; gen; ++j)
                std::cout << "fib(" << j << ")=" << gen() << '\n';
        }
        catch (const std::exception& ex)
        {
            std::cerr << "Exception: " << ex.what() << '\n';
        }
        catch (...)
        {
            std::cerr << "Unknown exception.\n";
        }
    }
```

Saída:
```
    fib(0)=0
    fib(1)=1
    fib(2)=1
    fib(3)=2
    fib(4)=3
    fib(5)=5
    fib(6)=8
    fib(7)=13
    fib(8)=21
    fib(9)=34
```

### Notas

| Macro de teste de recurso | Valor | Padrão | Recurso |
|---|---|---|---|
| [`__cpp_impl_coroutine`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [Coroutines](<#/doc/language/coroutines>) (suporte do compilador) |
| [`__cpp_lib_coroutine`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [Coroutines](<#/doc/coroutine>) (suporte da biblioteca) |
| [`__cpp_lib_generator`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | std::generator: gerador de coroutine síncrono para ranges |

### Palavras-chave

[`co_await`](<#/doc/keyword/co_await>), [`co_return`](<#/doc/keyword/co_return>), [`co_yield`](<#/doc/keyword/co_yield>)

### Suporte da biblioteca

[A biblioteca de suporte a coroutines](<#/doc/coroutine>) define vários tipos que fornecem suporte em tempo de compilação e execução para coroutines.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

| DR | Aplicado a | Comportamento conforme publicado | Comportamento correto |
|---|---|---|---|
| [CWG 2556](<https://cplusplus.github.io/CWG/issues/2556.html>) | C++20 | return_void inválido tornava o comportamento de<br>cair do final da coroutine indefinido | o programa é malformado neste caso |
| [CWG 2668](<https://cplusplus.github.io/CWG/issues/2668.html>) | C++20 | co_await não podia aparecer em expressões lambda | permitido |
[CWG 2754](<https://cplusplus.github.io/CWG/issues/2754.html>) | C++23 | *this era capturado ao construir o objeto promise para funções membro de objeto explícitas | *this não é capturado neste caso

### Veja também

[ generator](<#/doc/coroutine/generator>)(C++23) | Uma [`view`](<#/doc/ranges/view>) que representa um gerador de **coroutine** síncrono
(modelo de classe)

### Links externos

1. | Lewis Baker, 2017-2022 - [Asymmetric Transfer.](<https://lewissbaker.github.io/>)
---|---
2. | David Mazières, 2021 - [Tutorial on C++20 coroutines.](<https://www.scs.stanford.edu/~dm/blog/c++-coroutines.html>)
3. | Chuanqi Xu & Yu Qi & Yao Han, 2021 - [C++20 Principles and Applications of Coroutine. (Chinês)](<https://zhuanlan.zhihu.com/p/497224333>)
4. | Simon Tatham, 2023 - [Writing custom C++20 coroutine systems.](<https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/coroutines-c++20/>)