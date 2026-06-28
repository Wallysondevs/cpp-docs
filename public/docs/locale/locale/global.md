# std::locale::global

static locale global( const locale& loc );

  
Substitui a locale C++ global por `loc`, o que significa que todas as chamadas futuras ao construtor padrão de [std::locale](<#/doc/locale/locale>) agora retornarão uma cópia de `loc`. Se `loc` tiver um nome, também substitui a locale C como se por [std::setlocale](<#/doc/locale/setlocale>)([LC_ALL](<#/doc/locale/LC_categories>), `loc.name().c_str()`);. Esta função é a única maneira de modificar a locale C++ global, que de outra forma é equivalente a [std::locale::classic](<#/doc/locale/locale/classic>)() na inicialização do programa. 

### Parameters

loc  |  \-  |  a nova locale C++ global   
  
### Return value

O valor anterior da locale C++ global. 

### Example

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 8](<https://cplusplus.github.io/LWG/issue8>) | C++98  | não era especificado se outras funções de biblioteca (como  
[std::setlocale](<#/doc/locale/setlocale>)) poderiam modificar a locale C++ global  | especificado (nenhuma outra  
função de biblioteca permitida)   
  
### See also

[ (constructor)](<#/doc/locale/locale/locale>) |  constrói uma nova locale   
(função membro pública)  
[ classic](<#/doc/locale/locale/classic>)[static] |  obtém uma referência para a locale "C"   
(função membro estática pública)  
[ setlocale](<#/doc/locale/setlocale>) |  obtém e define a locale C atual   
(função)