# std::basic_iostream&lt;CharT,Traits&gt;::~basic_iostream

virtual ~basic_iostream();

  
Destrói o stream de entrada/saída.

### Notas

Este destrutor não realiza nenhuma operação no stream buffer subjacente (`rdbuf()`): os destrutores dos streams derivados, como [std::basic_fstream](<#/doc/io/basic_fstream>) e [std::basic_stringstream](<#/doc/io/basic_stringstream>), são responsáveis por chamar os destrutores dos stream buffers.