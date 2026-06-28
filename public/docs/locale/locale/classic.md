# std::locale::classic

static const locale& classic();

  
Obtém uma referência para a locale C++ que implementa a semântica da locale "C" clássica. Esta locale, ao contrário da locale global, não pode ser alterada. 

### Parâmetros

nenhum 

### Valor de retorno

Retorna uma referência para a locale "C". 

### Observações

Algumas das facets exigidas pelo padrão, como a facet de conversão UTF-8/UTF-32 [std::codecvt](<#/doc/locale/codecvt>)<char32_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>, não possuem equivalentes na locale "C", mas estão, no entanto, presentes na locale retornada por std::locale::classic(), assim como em qualquer outra locale construída em um programa C++. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ global](<#/doc/locale/locale/global>)[static] |  altera a locale global   
(função membro estática pública)  