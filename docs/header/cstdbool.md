# Cabeçalho da biblioteca padrão &lt;cstdbool&gt; (desde C++11)(até C++20), &lt;stdbool.h&gt; (desde C++11)

Este cabeçalho estava originalmente na biblioteca padrão C como [`<stdbool.h>`](<#/>).

Cabeçalho de compatibilidade. `true`, `false` e `bool` são [palavras-chave](<#/doc/keywords>) em C++, mas não eram palavras-chave em C até C23.

### Macros

---
__bool_true_false_are_defined(desde C++11)(obsoleto) | Constante de macro de compatibilidade C, expande para o literal inteiro 1
(constante de macro)

### Notas

`<cstdbool>` é obsoleto em C++17 e removido em C++20. O `<stdbool.h>` correspondente ainda está disponível em C++20.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3827](<https://cplusplus.github.io/LWG/issue3827>) | C++11 | Programas C não precisam mais da macro de compatibilidade `__bool_true_false_are_defined` desde C23 | tornou esta macro obsoleta em C++