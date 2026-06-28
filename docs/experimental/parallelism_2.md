# Extensões para paralelismo, versão 2

As Extensões C++ para Paralelismo Versão 2, ISO/IEC TS 19570:2018, definem os seguintes novos componentes para a standard library C++:

### Exceções paralelas

Definido no header `[<experimental/exception_list>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/exception_list&action=edit&redlink=1> "cpp/header/experimental/exception list \(page does not exist\)")`
---
[ exception_list](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/exception_list&action=edit&redlink=1> "cpp/experimental/exception list \(page does not exist\)") | exceções lançadas durante execuções paralelas
(class)

### Políticas de execução

Definido no header `[<experimental/execution_policy>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/execution_policy&action=edit&redlink=1> "cpp/header/experimental/execution policy \(page does not exist\)")`
---
[ unsequenced_policyvector_policy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/execution_policy_tag_t_v2&action=edit&redlink=1> "cpp/experimental/execution policy tag t v2 \(page does not exist\)") | tipos de política de execução
(class)
[ unseqvec](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/execution_policy_tag_v2&action=edit&redlink=1> "cpp/experimental/execution policy tag v2 \(page does not exist\)") | objetos de política de execução globais
(constant)

### Algoritmos paralelos

| Esta seção está incompleta

### Bloco de Tarefas

| Esta seção está incompleta

### [Tipos de Dados Paralelos](<#/doc/experimental/simd>)

[ simd](<#/doc/experimental/simd/simd>)(parallelism TS v2) | tipo de vetor de dados paralelos
(class template)
[ simd_mask](<#/doc/experimental/simd/simd_mask>)(parallelism TS v2) | tipo de dados paralelos com o tipo de elemento bool
(class template)

### Macros de teste de funcionalidade

Definido no header `[<experimental/task_block>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/task_block&action=edit&redlink=1> "cpp/header/experimental/task block \(page does not exist\)")`
---
__cpp_lib_experimental_parallel_task_block | um valor de pelo menos 201711 indica que a funcionalidade de bloco de tarefas é suportada
(macro constant)
Definido no header `[<experimental/execution>](<#/doc/header/experimental/execution>)`

```cpp
__cpp_lib_experimental_execution_vector_policy
(macro constant)
Definido no header `<experimental/algorithm>")`
__cpp_lib_experimental_parallel_for_loop
(macro constant)
Definido no header `<experimental/simd>`
__cpp_lib_experimental_parallel_simd
(macro constant)
```
