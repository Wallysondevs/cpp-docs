# std::basic_ios&lt;CharT,Traits&gt;::~basic_ios

virtual ~basic_ios();

  
Destrói o objeto `basic_ios`. `rdbuf` não é destruído.

### Notas

Este destrutor é `virtual` porque o destrutor da classe base, [`ios_base::~ios_base`](<#/doc/io/ios_base/~ios_base>), é virtual.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 53](<https://cplusplus.github.io/LWG/issue53>) | C++98  | era não especificado se `rdbuf` era destruído  | não é destruído 