# std::ios_base::~ios_base

virtual ~ios_base();

  
Destrói o objeto `ios_base`.

Antes que qualquer uma das funções membro produza comportamento indefinido, chama callbacks, registrados por [`register_callback()`](<#/doc/io/ios_base/register_callback>) passando [`erase_event`](<#/doc/io/ios_base/event>) como parâmetro. Em seguida, desaloca qualquer memória obtida.

Nenhuma operação em `rdbuf` é realizada, ele não é destruído.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3434](<https://cplusplus.github.io/LWG/issue3434>) | C++98  | o destrutor não era obrigado a recuperar memória para `iarray` e `parray` | exigido 