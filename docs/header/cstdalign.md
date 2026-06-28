# Cabeçalho da biblioteca padrão &lt;cstdalign&gt; (desde C++11)(até C++20), <stdalign.h> (desde C++11)

Este cabeçalho estava originalmente na biblioteca padrão C como [`<stdalign.h>`](<#/>). 

Cabeçalho de compatibilidade C. alignas e alignof são [keywords](<#/doc/keywords>) em C++, mas não eram keywords em C até C23. 

### Macros  
  
---  
__alignas_is_defined(desde C++11)(obsoleto) |  Constante macro de compatibilidade C, expande para o literal inteiro 1   
(constante macro)  
__alignof_is_defined(desde C++11)(obsoleto) |  Constante macro de compatibilidade C, expande para o literal inteiro 1   
(constante macro)  
  
### Notas

`<cstdalign>` é obsoleto em C++17 e removido em C++20. O [`<stdalign.h>`](<#/>) correspondente ainda está disponível em C++20. 

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3827](<https://cplusplus.github.io/LWG/issue3827>) | C++11  | Programas C não precisam mais da macro de compatibilidade `__alignas_is_defined` desde C23  | tornou esta macro obsoleta em C++