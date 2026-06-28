# std::coroutine_handle, std::noop_coroutine_handle

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
template< class Promise = void >
struct coroutine_handle;
template<>
struct coroutine_handle<void>;
template<>
struct coroutine_handle<std::noop_coroutine_promise>;
using noop_coroutine_handle =
std::coroutine_handle<std::noop_coroutine_promise>;
```

O template de classe `coroutine_handle` pode ser usado para se referir a uma coroutine suspensa ou em execução. Cada especialização de `coroutine_handle` é um [LiteralType](<#/doc/named_req/LiteralType>).

1) Template primário, pode ser criado a partir do objeto promise do tipo `Promise`.

2) A especialização std::coroutine_handle&lt;void&gt; apaga o tipo promise. É conversível a partir de outras especializações.

3) A especialização std::coroutine_handle<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)> se refere a coroutines no-op. Ela não pode ser criada a partir de um objeto promise.

Em implementações típicas, cada especialização de `std::coroutine_handle` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

Se o programa adicionar especializações para `std::coroutine_handle`, o comportamento é indefinido.

### Membros de dados

Nome do membro | Definição
---|---
`_ptr_` (privado) | Um ponteiro void* para o estado da coroutine.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/coroutine/coroutine_handle/coroutine_handle>) | constrói um objeto `coroutine_handle`
(função membro pública)
[ operator=](<#/>) | atribui o objeto `coroutine_handle`
(função membro pública)

##### Conversão

[ operator coroutine_handle<>](<#/doc/coroutine/coroutine_handle/operator_coroutine_handle_void>) | obtém um `coroutine_handle` com tipo apagado
(função membro pública)

##### Observadores

[ done](<#/doc/coroutine/coroutine_handle/done>) | verifica se a coroutine foi concluída
(função membro pública)
[ operator bool](<#/doc/coroutine/coroutine_handle/operator_bool>) | verifica se o handle representa uma coroutine
(função membro pública)

##### Controle

[ operator()resume](<#/doc/coroutine/coroutine_handle/resume>) | retoma a execução da coroutine
(função membro pública)
[ destroy](<#/doc/coroutine/coroutine_handle/destroy>) | destrói uma coroutine
(função membro pública)

##### Acesso à Promise

[ promise](<#/doc/coroutine/coroutine_handle/promise>) | acessa a promise de uma coroutine
(função membro pública)
[ from_promise](<#/doc/coroutine/coroutine_handle/from_promise>)[static] | cria um `coroutine_handle` a partir do objeto promise de uma coroutine
(função membro estática pública)

##### Exportar/Importar

[ address](<#/doc/coroutine/coroutine_handle/address>) | exporta o endereço subjacente, ou seja, o ponteiro que suporta a coroutine
(função membro pública)
[ from_address](<#/doc/coroutine/coroutine_handle/from_address>)[static] | importa uma coroutine a partir de um ponteiro
(função membro estática pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/coroutine/coroutine_handle/operator_cmp>)(C++20) | compara dois objetos `coroutine_handle`
(função)

### Classes auxiliares

[ std::hash<std::coroutine_handle>](<#/doc/coroutine/coroutine_handle/hash>)(C++20) | suporte a hash para `std::coroutine_handle`
(especialização de template de classe)

### Notas

Um `coroutine_handle` pode estar pendente (dangling), caso em que o `coroutine_handle` deve ser usado com cuidado para evitar comportamento indefinido.

### Exemplo

Execute este código
```cpp
    #include <coroutine>
    #include <iostream>
    #include <optional>
    
    template<std::movable T>
    class Generator
    {
    public:
        struct promise_type
        {
            Generator<T> get_return_object()
            {
                return Generator{Handle::from_promise(*this)};
            }
            static std::suspend_always initial_suspend() noexcept
            {
                return {};
            }
            static std::suspend_always final_suspend() noexcept
            {
                return {};
            }
            std::suspend_always yield_value(T value) noexcept
            {
                current_value = std::move(value);
                return {};
            }
            // Disallow co_await in generator coroutines.
            void await_transform() = delete;
            [[noreturn]]
            static void unhandled_exception() { throw; }
    
            std::optional<T> current_value;
        };
    
        using Handle = std::coroutine_handle<promise_type>;
    
        explicit Generator(const Handle coroutine) :
            m_coroutine{coroutine}
        {}
    
        Generator() = default;
        ~Generator()
        {
            if (m_coroutine)
                m_coroutine.destroy();
        }
    
        Generator(const Generator&) = delete;
        Generator& operator=(const Generator&) = delete;
    
        Generator(Generator&& other) noexcept :
            m_coroutine{other.m_coroutine}
        {
            other.m_coroutine = {};
        }
        Generator& operator=(Generator&& other) noexcept
        {
            if (this != &other)
            {
                if (m_coroutine)
                    m_coroutine.destroy();
                m_coroutine = other.m_coroutine;
                other.m_coroutine = {};
            }
            return *this;
        }
    
        // Range-based for loop support.
        class Iter
        {
        public:
            void operator++()
            {
                m_coroutine.resume();
            }
            const T& operator*() const
            {
                return *m_coroutine.promise().current_value;
            }
            bool operator==(std::default_sentinel_t) const
            {
                return !m_coroutine || m_coroutine.done();
            }
    
            explicit Iter(const Handle coroutine) :
                m_coroutine{coroutine}
            {}
    
        private:
            Handle m_coroutine;
        };
    
        Iter begin()
        {
            if (m_coroutine)
                m_coroutine.resume();
            return Iter{m_coroutine};
        }
    
        std::default_sentinel_t end() { return {}; }
    
    private:
        Handle m_coroutine;
    };
    
    template<std::integral T>
    Generator<T> range(T first, const T last)
    {
        while (first < last)
            co_yield first++;
    }
    
    int main()
    {
        for (const char i : range(65, 91))
            std::cout << i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3460](<https://cplusplus.github.io/LWG/issue3460>) | C++20 | a classe base pública de `coroutine_handle` poderia deixá-lo em um estado indesejado | herança removida

### Ver também

[ generator](<#/doc/coroutine/generator>)(C++23) | Uma [`view`](<#/doc/ranges/view>) que representa um gerador de [coroutine](<#/doc/language/coroutines>) síncrono
(template de classe)