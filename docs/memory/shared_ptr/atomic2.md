# std::atomic&lt;std::shared_ptr&gt;

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
struct std::atomic<std::shared_ptr<T>>;
```

A especialização parcial de template de [std::atomic](<#/doc/atomic/atomic>) para [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; permite aos usuários manipular objetos `shared_ptr` atomicamente.

Se múltiplas threads de execução acessarem o mesmo objeto [std::shared_ptr](<#/doc/memory/shared_ptr>) sem sincronização e qualquer um desses acessos usar uma função membro não-const de `shared_ptr`, então uma condição de corrida (data race) ocorrerá, a menos que todo esse acesso seja realizado através de uma instância de [std::atomic](<#/doc/atomic/atomic>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)> (ou, obsoleto a partir de C++20, através das [funções autônomas](<#/doc/memory/shared_ptr/atomic>) para acesso atômico a [std::shared_ptr](<#/doc/memory/shared_ptr>)).

Incrementos associados de `use_count` são garantidos como parte da operação atômica. Decrementos associados de `use_count` são sequenciados após a operação atômica, mas não são exigidos como parte dela, exceto pela mudança de `use_count` ao sobrescrever `expected` em um CAS falho. Qualquer exclusão e desalocação associadas são sequenciadas após a etapa de atualização atômica e não fazem parte da operação atômica.

Note que o bloco de controle de um `shared_ptr` é thread-safe: diferentes objetos [std::shared_ptr](<#/doc/memory/shared_ptr>) não-atômicos podem ser acessados usando operações mutáveis, como `operator=` ou `reset`, simultaneamente por múltiplas threads, mesmo quando essas instâncias são cópias e compartilham o mesmo bloco de controle internamente.

O tipo T pode ser um tipo incompleto.

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;

### Funções membro

Todas as funções não-especializadas de [std::atomic](<#/doc/atomic/atomic>) também são fornecidas por esta especialização, e nenhuma função membro adicional.

## atomic<shared_ptr&lt;T&gt;>::atomic

```cpp
constexpr atomic() noexcept = default;  // (1)
constexpr atomic( std::nullptr_t ) noexcept : atomic() {}  // (2)
atomic( std::shared_ptr<T> desired ) noexcept;  // (3)
atomic( const atomic& ) = delete;  // (4)
```

1,2) Inicializa o `shared_ptr<T>` subjacente com o valor nulo.

3) Inicializa o `shared_ptr<T>` subjacente com uma cópia de `desired`. Assim como em qualquer tipo [std::atomic](<#/doc/atomic/atomic>), a inicialização não é uma operação atômica.

4) Tipos atômicos não são construtíveis por cópia/movimentação.

## atomic<shared_ptr&lt;T&gt;>::operator=

```cpp
void operator=( const atomic& ) = delete;  // (1)
void operator=( std::shared_ptr<T> desired ) noexcept;  // (2)
void operator=( std::nullptr_t ) noexcept;  // (3)
```

1) Tipos atômicos não são atribuíveis por cópia/movimentação.

2) Atribuição de valor, equivalente a `store(desired)`.

3) Redefine o shared pointer atômico para o valor de ponteiro nulo. Equivalente a `store(nullptr);`.

## atomic<shared_ptr&lt;T&gt;>::is_lock_free

bool is_lock_free() const noexcept;

Retorna `true` se as operações atômicas em todos os objetos deste tipo são lock-free, `false` caso contrário.

## atomic<shared_ptr&lt;T&gt;>::store

void store( [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; desired,
[std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) noexcept;

Substitui atomicamente o valor de `*this` pelo valor de `desired` como se por `p.swap(desired)` onde `p` é o [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; subjacente. A memória é ordenada de acordo com `order`. O comportamento é indefinido se `order` for [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>), ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>).

## atomic<shared_ptr&lt;T&gt;>::load

[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; load( [std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept;

Retorna atomicamente uma cópia do shared pointer subjacente. A memória é ordenada de acordo com `order`. O comportamento é indefinido se `order` for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>).

## atomic<shared_ptr&lt;T&gt;>::operator std::shared_ptr&lt;T&gt;

operator [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;() const noexcept;

Equivalente a `return load();`.

## atomic<shared_ptr&lt;T&gt;>::exchange

[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; exchange( [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; desired,
[std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) noexcept;

Substitui atomicamente o [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; subjacente por `desired` como se por `p.swap(desired)` onde `p` é o [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; subjacente e retorna uma cópia do valor que `p` tinha imediatamente antes da troca. A memória é ordenada de acordo com `order`. Esta é uma operação atômica de leitura-modificação-escrita.

## atomic<shared_ptr&lt;T&gt;>::compare_exchange_weak, compare_exchange_strong

```cpp
bool compare_exchange_strong( std::shared_ptr<T>& expected, std::shared_ptr<T> desired,
std::memory_order success, std::memory_order failure ) noexcept;  // (1)
bool compare_exchange_weak( std::shared_ptr<T>& expected, std::shared_ptr<T> desired,
std::memory_order success, std::memory_order failure ) noexcept;  // (2)
bool compare_exchange_strong( std::shared_ptr<T>& expected, std::shared_ptr<T> desired,
std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (3)
bool compare_exchange_weak( std::shared_ptr<T>& expected, std::shared_ptr<T> desired,
std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (4)
```

1) Se o [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; subjacente armazena o mesmo `T*` que `expected` e compartilha a propriedade com ele, ou se ambos, subjacente e `expected`, estão vazios, atribui `desired` ao [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; subjacente, retorna `true`, e ordena a memória de acordo com `success`; caso contrário, atribui do [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; subjacente a `expected`, retorna `false`, e ordena a memória de acordo com `failure`. O comportamento é indefinido se `failure` for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>). Em caso de sucesso, a operação é uma operação atômica de leitura-modificação-escrita em `*this` e `expected` não é acessado após a atualização atômica. Em caso de falha, a operação é uma operação atômica de carregamento em `*this` e `expected` é atualizado com o valor existente lido do objeto atômico. Esta atualização do `use_count` de `expected` faz parte desta operação atômica, embora a escrita em si (e qualquer desalocação/destruição subsequente) não seja exigida como parte dela.

2) O mesmo que (1), mas também pode falhar espuriamente.

3) Equivalente a: `return compare_exchange_strong(expected, desired, order, fail_order);`, onde `fail_order` é o mesmo que `order`, exceto que [std::memory_order_acq_rel](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_release](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_relaxed](<#/doc/atomic/memory_order>).

4) Equivalente a: `return compare_exchange_weak(expected, desired, order, fail_order);`, onde `fail_order` é o mesmo que `order`, exceto que [std::memory_order_acq_rel](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_release](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_relaxed](<#/doc/atomic/memory_order>).

## atomic<shared_ptr&lt;T&gt;>::wait

void wait( [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; old,
[std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept;

Executa uma operação de espera atômica.

Compara `load(order)` com `old` e, se forem equivalentes, então bloqueia até que `*this` seja notificado por `notify_one()` ou `notify_all()`. Isso é repetido até que `load(order)` mude. Esta função é garantida para retornar somente se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie espuriamente.

A memória é ordenada de acordo com `order`. O comportamento é indefinido se `order` for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>).

Notas: dois `shared_ptr`s são equivalentes se armazenam o mesmo ponteiro e ou compartilham a propriedade ou ambos estão vazios.

## atomic<shared_ptr&lt;T&gt;>::notify_one

void notify_one() noexcept;

Executa uma operação de notificação atômica.

Se houver uma thread bloqueada em operações de espera atômicas (ou seja, `wait()`) em `*this`, então desbloqueia pelo menos uma dessas threads; caso contrário, não faz nada.

## atomic<shared_ptr&lt;T&gt;>::notify_all

void notify_all() noexcept;

Executa uma operação de notificação atômica.

Desbloqueia todas as threads bloqueadas em operações de espera atômicas (ou seja, `wait()`) em `*this`, se houver alguma; caso contrário, não faz nada.

### Constantes membro

A única constante membro padrão de [std::atomic](<#/doc/atomic/atomic>) `is_always_lock_free` também é fornecida por esta especialização.

## atomic<shared_ptr&lt;T&gt;>::is_always_lock_free

static constexpr bool is_always_lock_free = /*implementation-defined*/;

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_atomic_shared_ptr`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | [`std::atomic<std::shared_ptr>`](<#/doc/memory/shared_ptr/atomic2>)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3661](<https://cplusplus.github.io/LWG/issue3661>) | C++20 | `atomic<shared_ptr<T>>` não era inicializável por constante a partir de `nullptr` | tornada inicializável por constante
[LWG 3893](<https://cplusplus.github.io/LWG/issue3893>) | C++20 | [LWG3661](<https://cplusplus.github.io/LWG/issue3661>) tornou `atomic<shared_ptr<T>>` não atribuível a partir de `nullptr_t` | atribuibilidade restaurada

### Ver também

[ atomic](<#/doc/atomic/atomic>)(C++11) | template de classe atomic e especializações para tipos bool, integral, ponto flutuante, (desde C++20) e ponteiro
(template de classe)