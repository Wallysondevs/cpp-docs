# Cabeçalho da biblioteca padrão &lt;csetjmp&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<setjmp.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [suporte a programa](<#/doc/utility/program>).

### Tipos

---
[ jmp_buf](<#/doc/utility/program/jmp_buf>) | tipo de contexto de execução
(typedef)

### Macros

[ setjmp](<#/doc/utility/program/setjmp>) | salva o contexto
(function macro)

### Funções

[ longjmp](<#/doc/utility/program/longjmp>) | salta para o local especificado
(function)

### Sinopse
```cpp
namespace std {
  using jmp_buf = /* see description */ ;
  [[noreturn]] void longjmp(jmp_buf env, int val);
}
#define setjmp(env) /* see description */
```