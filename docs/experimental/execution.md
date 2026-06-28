# Biblioteca de Execução (desde C++26)

A biblioteca de Execução fornece um framework para gerenciar a execução assíncrona em recursos de execução genéricos.

A biblioteca visa fornecer tipos de vocabulário para operações assíncronas e permitir a construção de grafos de execução de tarefas de forma simples e composível.

## Definições em toda a biblioteca

  * **Sender** : Uma descrição de trabalho assíncrono a ser enviado para execução. Produz um estado de operação (abaixo).

    

  * Senders assincronamente “enviam” seus resultados para ouvintes chamados “receivers” (abaixo).
  * Senders podem ser compostos em **grafos de tarefas** usando algoritmos genéricos.
  * **Fábricas e adaptadores de sender** são algoritmos genéricos que capturam padrões assíncronos comuns em objetos que satisfazem o concept de sender.

  * **Receiver** : Um callback generalizado que consome ou “recebe” os resultados assíncronos produzidos por um sender.

    

  * Receivers possuem três “canais” diferentes através dos quais um sender pode propagar resultados: sucesso, falha e cancelado, assim nomeados “value”, “error” e “stopped”.
  * Receivers fornecem um ambiente de execução extensível: um conjunto de pares chave/valor que o consumidor pode usar para parametrizar a operação assíncrona.

  * **Operation State** : Um objeto que contém o estado necessário para a operação assíncrona.

    

  * Um sender e um receiver são conectados quando passados para a função std::execution::connect.
  * O resultado da conexão de um sender e um receiver é um estado de operação.
  * O trabalho não é enfileirado para execução até que “`start`” seja chamado em um estado de operação.
  * Uma vez iniciado, o tempo de vida do estado de operação não pode terminar antes que a operação assíncrona seja concluída, e seu endereço deve ser estável.

  * **Scheduler** : Um handle leve para um contexto de execução.

    

  * Um contexto de execução é uma fonte de execução assíncrona, como um pool de threads ou um stream de GPU.
  * Um scheduler é uma fábrica para um sender que completa seu receiver a partir de um thread de execução pertencente ao contexto de execução.

## Utilitários da biblioteca

### Conceitos

#### Schedulers

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::scheduler(C++26)
(concept)
```

#### Senders

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::sender")(C++26)
(concept)
 execution::sender_in")(C++26)
(concept)
 execution::sender_to")(C++26)
(concept)
```

#### Receivers

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::receiver")(C++26)
(concept)
 execution::receiver_of")(C++26)
(concept)
```

#### Estados de operação

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::operation_state")(C++26)
(concept)
```

### Componentes de utilidade

#### Contextos de execução

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::run_loop")(C++26)
(class)
```

#### Domínios de execução

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::default_domain")(C++26)
(class)
 execution::transform_sender")(C++26)
(function template)
 execution::transform_env")(C++26)
(function template)
 execution::apply_sender")(C++26)
(function template)
```

#### Garantia de progresso adiante

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::forward_progress_guarantee")(C++26)
(enum)
```

#### Ambientes

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::prop")(C++26)
(class template)
 execution::env")(C++26)
(class template)
 execution::get_env")(C++26)
(customization point object)
```

#### Consultas

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
[ forwarding_query](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/forwarding_query&action=edit&redlink=1> "cpp/execution/forwarding query \(page does not exist\)")(C++26) | pergunta a um objeto de consulta se ele deve ser encaminhado através de adaptadores consultáveis
(customization point object)
[ get_allocator](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_allocator&action=edit&redlink=1> "cpp/execution/get allocator \(page does not exist\)")(C++26) | pergunta a um objeto consultável por seu alocador associado
(customization point object)
[ get_stop_token](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_stop_token&action=edit&redlink=1> "cpp/execution/get stop token \(page does not exist\)")(C++26) | pergunta a um objeto consultável por seu stop token associado
(customization point object)
[ execution::get_domain](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_domain&action=edit&redlink=1> "cpp/execution/get domain \(page does not exist\)")(C++26) | pergunta a um objeto consultável por sua tag de domínio de execução associada
(customization point object)
[ execution::get_scheduler](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_scheduler&action=edit&redlink=1> "cpp/execution/get scheduler \(page does not exist\)")(C++26) | pergunta a um objeto consultável por seu scheduler associado
(customization point object)
[ execution::get_delegation_scheduler](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_delegation_scheduler&action=edit&redlink=1> "cpp/execution/get delegation scheduler \(page does not exist\)")(C++26) | pergunta a um objeto consultável por um scheduler que pode ser usado para delegar trabalho com o propósito de delegação de progresso adiante
(customization point object)
[ execution::get_completion_scheduler](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_completion_scheduler&action=edit&redlink=1> "cpp/execution/get completion scheduler \(page does not exist\)")(C++26) | obtém o scheduler de conclusão associado a uma tag de conclusão a partir dos atributos de um sender
(customization point object)
[ execution::get_forward_progress_guarantee](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/get_forward_progress_guarantee&action=edit&redlink=1> "cpp/execution/get forward progress guarantee \(page does not exist\)")(C++26) | pergunta a um scheduler sobre sua execution::forward_progress_guarantee
(customization point object)

#### Assinaturas de conclusão

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::completion_signatures")(C++26)
(class template)
 execution::get_completion_signatures")(C++26)
(customization point object)
 execution::transform_completion_signatures")(C++26)
(alias template)
 execution::transform_completion_signatures_of")(C++26)
(alias template)
 execution::tag_of_t")(C++26)
(alias template)
 execution::value_types_of_t")(C++26)
(alias template)
 execution::error_types_of_t")(C++26)
(alias template)
 execution::sends_stopped")(C++26)
(variable template)
```

#### Utilitário de corrotina

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::as_awaitable")(C++26)
(customization point object)
 execution::with_awaitable_senders")(C++26)
(class template)
```

### Operações centrais

#### Estado de operação

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::connect")(C++26)
(customization point object)
 execution::start")(C++26)
(customization point object)
```

#### Funções de conclusão

Essas funções são chamadas por senders para anunciar a conclusão do trabalho aos seus receivers.

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::set_value")(C++26)
(customization point object)
 execution::set_error")(C++26)
(customization point object)
 execution::set_stopped")(C++26)
(customization point object)
```

### Algoritmos de sender

| Esta seção está incompleta
Razão: Atualização WIP para o padrão atual em andamento

#### Fábricas de sender

Uma fábrica de sender é uma função que retorna um sender e cujos parâmetros têm tipos para os quais o concept [`sender`](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/sender&action=edit&redlink=1> "cpp/execution/sender \(page does not exist\)") é falso.

As seguintes são fábricas de sender:

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::just(C++26)
(customization point object)
 execution::just_error(C++26)
(customization point object)
 execution::just_stopped(C++26)
(customization point object)
 execution::read_env(C++26)
(customization point object)
 execution::schedule(C++26)
(customization point object)
```

#### Adaptadores de sender pipeable

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::sender_adaptor_closure")(C++26)
(class template)
```

#### Adaptadores de sender

Um adaptador de sender é uma função que retorna um sender cujos parâmetros incluem pelo menos um cujo tipo satisfaz o concept [`sender`](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/sender&action=edit&redlink=1> "cpp/execution/sender \(page does not exist\)") e para o qual o sender retornado é um sender pai dos argumentos de sender da função adaptadora.

Os seguintes são adaptadores de sender:

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 execution::starts_on")(C++26)
(customization point object)
 execution::continues_on")(C++26)
(customization point object)
 execution::on(C++26)
(customization point object)
 execution::schedule_from")(C++26)
(customization point object)
 execution::then(C++26)
(customization point object)
 execution::upon_error(C++26)
(customization point object)
 execution::upon_stopped(C++26)
(customization point object)
 execution::let_value(C++26)
(customization point object)
 execution::let_error(C++26)
(customization point object)
 execution::let_stopped(C++26)
(customization point object)
 execution::bulk")(C++26)
(customization point object)
 execution::split")(C++26)
(customization point object)
 execution::when_all(C++26)
(customization point object)
 execution::when_all_with_variant")(C++26)
(customization point object)
 execution::into_variant(C++26)
(customization point object)
 execution::stopped_as_optional(C++26)
(customization point object)
 execution::stopped_as_error(C++26)
(customization point object)
```

#### Consumidores de sender

Um consumidor de sender é um algoritmo que recebe um ou mais senders como parâmetros e que não retorna um sender.

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::this_thread`

```cpp
 this_thread::sync_wait(C++26)
(customization point object)
 this_thread::sync_wait_with_variant")(C++26)
(customization point object)
```

### Exemplo

Uma versão deste exemplo está disponível em [godbolt.org](<https://godbolt.org/z/vdxGsxsKd>), onde usa [stdexec](<https://github.com/NVIDIA/stdexec>), uma implementação de referência experimental de std::execution.

Execute este código
```cpp
    #include <cstdio>
    #include <execution>
    #include <string>
    #include <thread>
    #include <utility>
    using namespace std::literals;
    
    int main()
    {
        std::execution::run_loop loop;
    
        std::jthread worker(&
        {
            std::stop_callback cb{st, [&]{ loop.finish(); }};
            loop.run();
        });
    
        std::execution::sender auto hello = std::execution::just("hello world"s);
        std::execution::sender auto print
            = std::move(hello)
            | std::execution::then(
            {
                return std::puts(msg.c_str());
            });
    
        std::execution::scheduler auto io_thread = loop.get_scheduler();
        std::execution::sender auto work = std::execution::on(io_thread, std::move(print));
    
        auto [result] = std::this_thread::sync_wait(std::move(work)).value();
    
        return result;
    }
```

Saída:
```
    hello world
```

### Veja também

[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em um novo thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado
(function template)